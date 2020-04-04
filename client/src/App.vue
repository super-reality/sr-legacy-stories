<template>
  <v-app>
    <v-app-bar app color="primary accent-4" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title 
        @click="$router.push('/')" 
        style="cursor: pointer"
        class="mr-2">Trello clone</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-list v-if="user" class="py-0" color="purple dark-3" dark>
        <v-list-item>
          <v-list-item-title class="mr-2 d-flex align-center">
            {{ user.displayName }}
          </v-list-item-title>
          <v-avatar v-if="user.imageUrl" size="35" class="d-flex flex-column">
            <img
              :src="user.imageUrl"
              :v-html="icons.user"
              :alt="user.displayName">
          </v-avatar>
          <v-icon v-else>{{ icons.user }}</v-icon>
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <div v-if="$store.state.auth.user">
        <v-btn :to="('/boards')" text small>All boards</v-btn>
        <v-btn @click="logout" text small>logout</v-btn>
      </div>

      <v-menu v-else left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="$router.push({name: 'signup'});">
            <v-list-item-title>Signup</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push({name: 'login'});">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mdiAccountCircle } from '@mdi/js';
export default {
  name: 'App',
  data: () => ({
    icons: {
      user: mdiAccountCircle
    }
  }),
  methods: {
    ...mapMutations('boards', {clearBoards: 'clearAll'}),
    async logout() {
      try{
        await this.$store.dispatch('auth/logout');
        this.$router.push('/login');
        this.clearBoards();
      } catch(err) {
        console.log(err);
      }
    }
  },
  computed: {
    ...mapState('auth', { user: 'user'}),
  }
};
</script>
