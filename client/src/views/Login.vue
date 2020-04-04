<template>
    <v-app id="inspire">
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
               <v-col cols="12" sm="8" md="4">
                  <v-card class="elevation-12">
                     <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form v-model="valid" v-if="!loading">

                           <v-text-field label="Username"
                              v-model.trim="user.username"
                              :prepend-icon="icons.username"
                              :rules="notEmptyRules"
                              type="text" />

                           <v-text-field
                              label="Password"
                              v-model.trim="user.password"
                              :rules="notEmptyRules"
                              :prepend-icon="icons.password"
                              :append-icon="showPassword ? icons.eyeOff : icons.eye"
                              @click:append="showPassword = !showPassword"
                              :type="showPassword ? 'text' : 'password'" />

                        </v-form>

                        <div v-else class="d-flex justify-center">
                           <v-progress-circular  
                              :size="50" 
                              color="primary" 
                              indeterminate />
                        </div>

                     </v-card-text>
                     <v-card-actions>
                        <v-spacer />
                        <v-btn 
                           @click="loginUser"
                           class="mb-4 mr-4"
                           type="button" 
                           color="primary" 
                           :disabled="!valid">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
   import { mapActions, mapState } from 'vuex';
   import { mdiAccountCircle, mdiLock, mdiEye, mdiEyeOff } from '@mdi/js';
   export default {
      name: 'login',
      data: (vm) => ({
         icons: {
            username: mdiAccountCircle,
            password: mdiLock,
            eye: mdiEye,
            eyeOff: mdiEyeOff
         },
         user: {
            username: '',
            password: '',
            strategy: 'local'
         },
         showPassword: false,
         valid: false,
         notEmptyRules: [ v => !!v || 'Can not be empty'],
         confirmPasswordRules: [v => v === vm.user.password || 'Password must match']
      }),
      methods: {
         ...mapActions('auth', [ 'authenticate']),
         async loginUser() {
            if(this.valid) {
               try {
                  await this.authenticate(this.user);
                  this.$router.push('/boards')
               } catch (err) { console.log(err) }
            }
         }
      },
      computed: {
         ...mapState('auth', { loading: 'isAuthenticatePending' }),
      }
   }
</script>