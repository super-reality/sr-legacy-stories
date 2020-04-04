<template>
    <v-app id="inspire">
         <v-container 
            v-if="!loadingBoard || !loadingLists" 
            fluid class="px-4">
               <v-row justify="center" dense>
                  <v-col sm="12" md="9">
                     <h2 v-if="board" class="display-2 mb-4" style="text-align: center">
                        {{board.name}}
                     </h2>
                     <v-layout 
                        class="d-flex flex-wrap"
                        :class="{
                           'justify-center': lists.length <= 2,
                           'px-4': lists.length === 3
                        }">
                        <v-card 
                           v-for="list in lists" 
                           :key="list._id" 
                           :listId="list._id"
                           class="mr-4 mb-4 align-self-start"
                           :style="(lists.length > 2 && lists.length <= 4) && 'flex: 1'"
                           width="260">

                           <v-card-title>
                              {{ list.name }}
                              <v-spacer/>
                              <v-icon 
                                 @click="removeList(list._id)" 
                                 color="error">{{ icons.trash }}</v-icon>
                           </v-card-title>
                           <v-card-actions class="px-0">
                              <CreateCard
                                 :lists="lists"
                                 :listId="list._id"
                                 :droppingListId="droppingListId"
                                 :setDroppingListId="setDroppingListId"
                                 :cardsLoading="cardsLoading"
                                 :setCardsLoading="setCardsLoading"/>
                           </v-card-actions>
                        </v-card>
                     </v-layout>
                  </v-col>
                  <v-col sm="12" md="3">
                     <v-card>
                        <v-toolbar color="purple dark-3" dark dense>
                           <v-toolbar-title>Create List</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text class="pb-0 pt-2">
                           <v-form v-if="!creatingList">
                              <v-text-field label="Name"
                                 v-model="list.name"
                                 type="text" />
                           </v-form>
                           <div v-else class="d-flex justify-center">
                              <v-progress-circular  
                                 :size="50" 
                                 color="primary" 
                                 indeterminate />
                           </div>
                        </v-card-text>

                        <v-card-actions class="pa-0">
                           <v-spacer />
                           <v-btn 
                              @click.prevent="createList"
                              :dark="!!list.name"
                              class="mb-4 mr-4"
                              type="button" 
                              color="purple dark-2" 
                              :disabled="!list.name">Create</v-btn>
                        </v-card-actions>
                        
                     </v-card>
                  </v-col>
               </v-row>
         </v-container>

         <v-container v-else>
            <div class="d-flex justify-center">
               <v-progress-circular  
                  :size="50" 
                  color="primary" 
                  indeterminate />
            </div>>
         </v-container>
    </v-app>
</template>

<script>
import CreateCard from './CreateCard';
import { mapActions, mapState, mapGetters } from 'vuex';
import { mdiMinusCircle, mdiTrashCanOutline } from '@mdi/js';

export default {
   name: 'board',
   components: {
      CreateCard
   },
   data: () => ({
      icons: {
         minus: mdiMinusCircle,
         trash: mdiTrashCanOutline
      },
      list: {
         name: '',
         order: 0
      },
      cardsLoading: false,
      droppingListId: null,
      draggingCardId: null,
      valid: false,
      notEmptyRules: [ v => !!v || 'Can not be empty'],
   }),
   methods: {
      ...mapActions('boards', { getBoard: 'get' }),
      ...mapActions('lists', { findLists: 'find' }),
      async createList() {
         const { List } = this.$FeathersVuex.api;
         this.list.boardId = this.$route.params.id;
         const list = new List(this.list);
         try {
            await list.save();
            this.list.name = '';
         } catch (err) { 
            console.log(err) 
         }
      },
      async removeList(id) {
         const { List } = this.$FeathersVuex.api;
         const list = await List.get(id);
         list.remove()
      },
      setDroppingListId(id) { this.droppingListId = id; },
      setCardsLoading(bool) { this.cardsLoading = bool }
   },
   computed: {
      ...mapState('boards', { loadingBoard: 'isGetPending'}),
      ...mapState('lists', { loadingLists: 'isFindPending', creatingList: 'isCreatePending'}),
      ...mapGetters('boards', { getBoardInStore: 'get' }),
      ...mapGetters('lists', { findListsInStore: 'find' }),
      board () {
         return this.getBoardInStore(this.$route.params.id);
      },
      lists () {
         return this.findListsInStore({ query: {
            boardId: this.$route.params.id
         }}).data
      },
   },
   async mounted() {
      try{
         Promise.all([
            await this.getBoard(this.$route.params.id),
            await this.findLists({query: { boardId: this.$route.params.id }}),
         ]);
      } catch(err) {
         this.$router.go(-1);
      }
   }
}
</script>