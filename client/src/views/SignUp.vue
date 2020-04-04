<template>
    <v-app id="inspire">
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
               <v-col cols="12" sm="8" md="4">
                  <v-card class="elevation-12">
                     <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Signup form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form v-model="valid" v-if="!loading">
                           
                           <v-text-field label="Username"
                              v-model.trim="user.username"
                              :prepend-icon="icons.username"
                              :rules="notEmptyRules"
                              clearable
                              type="text" />

                           <v-text-field label="Displa name"
                              v-model.trim="user.displayName"
                              :prepend-icon="icons.displayName"
                              :rules="notEmptyRules"
                              clearable
                              type="text" />

                           <v-text-field
                              label="Password"
                              v-model.trim="user.password"
                              :rules="notEmptyRules"
                              :prepend-icon="icons.password"
                              :append-icon="showPassword ? icons.eyeOff : icons.eye"
                              @click:append="showPassword = !showPassword"
                              :type="showPassword ? 'text' : 'password'" />
                           
                           <v-text-field
                              label="Confirm password"
                              v-model.trim="user.confirmPassword"
                              :rules="confirmPasswordRules"
                              :prepend-icon="icons.password"
                              :append-icon="showConfirmPassword ? icons.eyeOff : icons.eye"
                              @click:append="showConfirmPassword = !showConfirmPassword"
                              :type="showConfirmPassword ? 'text' : 'password'" />

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
                           @click="signup"
                           class="mb-4 mr-4"
                           type="button" 
                           color="primary" 
                           :disabled="!valid">Signup</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
   import { mapActions, mapState } from 'vuex'
   import { 
      mdiAccountCircle, mdiLock, mdiImage, mdiAccountBox, 
      mdiEye, mdiEyeOff 
   } from '@mdi/js';
   export default {
      name: 'signup',
      data: (vm) => ({
         icons: {
            username: mdiAccountCircle,
            displayName: mdiAccountBox,
            password: mdiLock,
            imageUrl: mdiImage,
            eye: mdiEye,
            eyeOff: mdiEyeOff
         },
         user: {
            username: '',
            password: '',
            confirmPassword: '',
            displayName: '',
            strategy: 'local'
         },
         showPassword: false,
         showConfirmPassword: false,
         valid: false,
         notEmptyRules: [ v => !!v || 'Can not be empty'],
         confirmPasswordRules: [v => v === vm.user.password || 'Password must match']
      }),
      computed: {
         ...mapState('users', { loading: 'isCreatePending' }),
      },
      methods: {
         ...mapActions('auth', [ 'authenticate' ]),
         async signup() {
            if(this.valid) {
               const { User } = this.$FeathersVuex.api;
               const user = new User(this.user)
               try {
                  const res = await user.save();
                  console.log(res)
                  this.$router.push('/login');
               } catch (err) { 
                  console.log(err) 
               }
            }
         }
      }
   }
</script>