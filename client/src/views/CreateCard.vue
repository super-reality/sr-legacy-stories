<template>
   <v-card 
      class="elevation-0 d-flex flex-column align-center" 
      style="width: 100%">
      <v-card-text v-if="!cardsLoading" class="pa-0">
         <draggable 
            v-model="listCards" 
            group="people" 
            style="min-height: 70px; cursor: pointer"
            class="pa-2"
            @start="drag=true" 
            @end="drag=false">
            <v-card 
               v-for="card in listCards" 
               :key="card._id"
               :cardId="card._id" 
               @dragend="dragend"
               elevation="5" 
               class="pa-0 my-2">
               <v-card-subtitle 
                  style="color: #000"
                  class="pa-2 d-flex justify-space-between align-center">
                  {{card.title}}
                  <v-icon 
                     @click="removeCard(card._id)" 
                     size="16"
                     color="error">{{ icons.minus }}</v-icon>
               </v-card-subtitle>
            </v-card>
         </draggable>
      </v-card-text>
      <div v-else class="d-flex justify-center">
         <v-progress-circular  
            :size="50" 
            color="primary" 
            indeterminate />
      </div>
      <v-card-text class="pa-0 mt-4 d-flex flex-column justify-center">
         <v-form class="px-8">
            <v-text-field 
               label="Title"
               v-model.trim="card.title"
               type="text" />
         </v-form>
         <v-btn 
            class="align-self-center mb-4"
            @click="createCard"
            small
            type="button" 
            color="primary" 
            :disabled="!card.title">Create Card</v-btn>
         </v-card-text>
   </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import { mdiMinusCircle } from '@mdi/js';
export default {
   name: 'login',
   components: {
      draggable
   },
   props: [
      'lists',
      'listId',
      'droppingListId',
      'setDroppingListId',
      'cardsLoading',
      'setCardsLoading',
   ],
   data: () => ({
      card: {
         title: '',
      },
      allCards: [],
      listCards: [],
      icons: {
         minus: mdiMinusCircle
      }
   }),
   methods: {
      ...mapActions('cards', { findCards: 'find' }),
      async createCard() {
         const { Card } = this.$FeathersVuex.api;
         this.card.boardId = this.$route.params.id;
         this.card.listId = this.listId;
         this.card.order = this.cards.length + 1;
         const card = new Card(this.card);
         try {
            await card.save();
            this.card.title = '';
         } catch (err) { 
            console.log(err) 
         }
      },
      async removeCard(id) {
         const { Card } = this.$FeathersVuex.api;
         const card = await Card.get(id);
         card.remove();
      },
      async dragend(ev) {
         const currentCardId = ev.target.getAttribute('cardId');
         // DOM elements
         const listDOM = document.querySelector(`[cardId="${currentCardId}`).closest(`[listId]`);
         const listIdDOM = listDOM.getAttribute('listId');
         let listCardsDOM = Array.from(listDOM.querySelectorAll('[cardId]'));
         const cardIdsDOM = listCardsDOM.map(lc => lc.getAttribute('cardId'));
         
         const allCards = this.findCardsInStore().data;
         const currentCard = this.cards.find(c => c._id === currentCardId); 
         let listCards = [];
         cardIdsDOM.forEach((cId, i) => {
            listCards.push(
               allCards.find(c => {
                  if(c._id === cId) {
                     c.order = i + 1;
                     return true
                  }
               }
            ));
         });
         if(currentCard.listId !== listIdDOM) { 
            currentCard.listId = listIdDOM;
            try {
               this.setCardsLoading(true);
               const res = await Promise.all(listCards.map(c => c.save()));
               this.oldListCards = res;
            }
            catch(err) { console.log(err) }
            finally { this.setCardsLoading(false); }
         } 
         
         else {
            const listCardsTxt = JSON.stringify(listCards.map(c => ({o:c.order, t:c.title})));
            const oldListCardsTxt = JSON.stringify(this.oldListCards.map(c => ({o:c.order, t:c.title})));
            if(listCardsTxt !== oldListCardsTxt) {
               try {
                  this.setCardsLoading(true);
                  const otherList = this.lists.find(l => l._id !== listIdDOM);
                  currentCard.listId = otherList._id;
                  const res = await Promise.all(listCards.map(c => c.save()));
                  currentCard.listId = listIdDOM;
                  await currentCard.save();
                  this.oldListCards = res;
               }
               catch(err) { console.log(err) }
               finally { this.setCardsLoading(false); }
            } else {
               console.log('same')
            }
         }         
      },
      async findAllCards() {
         const res = await this.findCards();
         this.allCards = res.data;
         this.listCards = res.data
            .filter(c => c.listId === this.listId)
            .sort((a, b) => a.order-b.order);
         this.oldListCards = this.listCards.map(c => ({...c}))
      }
   },
   computed: {
      ...mapGetters('cards', { findCardsInStore: 'find' }),
      cards() { 
         const cards = this.findCardsInStore({
            query: { listId: this.listId, }
         }).data;
         return cards
      }
   },
   watch: {
      cards() { 
         // console.log('watch')
         this.listCards = this.findCardsInStore({
            query: { listId: this.listId, }
         }).data.sort((a, b) => a.order-b.order);
         this.oldListCards = this.listCards.map(c => ({...c}))
      }
   },
   mounted() {
      this.findAllCards();
   }
}
</script>