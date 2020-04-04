<template>
    <v-app id="inspire">
        <v-container fluid class="px-4 pt-6">
            <v-row justify="center" dense>
               <v-col v-if="!loading" cols="9" sm="12" md="9" class="d-flex flex-wrap">
                  <v-card 
                     v-for="board in boards" 
                     :key="board._id" 
                     class="mr-4 mb-4"
                     width="260">

                     <v-img :src="board.background" height="144px"/>

                     <v-card-title>{{ board.name }}</v-card-title>

                     <v-card-actions>
                        <v-spacer/>
                        <v-btn 
                           @click="removeBoard(board._id)"
                           class="mt-6" 
                           color="error">Remove</v-btn>
                        <v-btn 
                           :to="'boards/' + board._id"
                           class="mt-6" 
                           color="primary">Go</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-col>
               <v-col cols="3" sm="12" md="3">
                  <v-card>
                     <v-toolbar color="purple dark-3" dark dense>
                        <v-toolbar-title>Create Board</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form v-if="!creating">
                           <v-text-field label="Name"
                              v-model="board.name"
                              type="text" />
                           <v-text-field label="Background"
                              v-model="board.background"
                              type="text" />
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
                           @click.prevent="createBoard"
                           :dark="!!board.name && !!board.background"
                           class="mb-4 mr-4"
                           type="button" 
                           color="purple dark-2" 
                           :disabled="!board.name || !board.background">Create</v-btn>
                     </v-card-actions>
                     
                  </v-card>
               </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
   name: 'boards',
   data: () => ({
      board: {
         name: '',
         background: '',
      },
   }),
   methods: {
      ...mapActions('boards', { findBoards: 'find' }),
      async createBoard() {
         const { Board } = this.$FeathersVuex.api;
            const board = new Board(this.board);
            try {
               await board.save();
               this.board.name = '';
               this.board.background = '';
            } catch (err) { 
               console.log(err) 
            }
      },
      async removeBoard(id) {
         const { Board } = this.$FeathersVuex.api;
         const board = Board.getFromStore(id);
         try {
            await board.remove();
         } catch (err) { 
            console.log(err) 
         }
      }
   },
   computed: {
      ...mapState('boards', { 
         loading: 'isFindPending', 
         creating: 'isCreatePending'
      }),
      ...mapGetters('boards', { storeBoards: 'find' }),
      boards () {
         return this.storeBoards({ query: {} }).data
      },
   },
   async mounted() {
      await this.findBoards();
   }
}
</script>