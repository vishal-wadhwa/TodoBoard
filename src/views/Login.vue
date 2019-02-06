<template>
  <v-container fluid class='login-view pa-0' justify-center align-center fill-height>
    <v-card
      class='ma-5'
      height='75vh'
      width='75vw'
      :img='require("@/assets/img/login_welcome_design.png")'
      raised
    >
      <v-layout row fill-height class='login-view__content'>
        <app-logo class='logo' color='black' size='1.5rem'></app-logo>
        <v-flex class='login-fields-container' md4 xs12>
          <v-form class='mx-4' style='width: 100%;' ref='form'>
            <v-text-field
              v-model.trim='fullname'
              color='black'
              label='Full Name'
              type='text'
              :rules='rules.fullname'
              validate-on-blur
              ref='fullNameField'
              v-if='curState === STATE_SIGN_UP'
            ></v-text-field>
            <v-text-field
              v-model.trim='email'
              color='black'
              label='Email ID'
              type='email'
              :rules='rules.email'
              validate-on-blur
              ref='emailField'
            ></v-text-field>
            <v-text-field
              v-model='password'
              color='black'
              label='Password'
              :type='showPass ? "text" : "password"'
              :rules='rules.password'
              validate-on-blur
              :append-icon='showPass ? "visibility_off" : "visibility"'
              counter
              hint='Password must have a minimum of 8 letters'
              @click:append='showPass = !showPass'
            ></v-text-field>
            <v-layout class='mt-3' justify-space-between>
              <div></div>
              <div>
                <span @click='toggleState' class='btn-create-acct body-1'>
                  {{
                  curState === STATE_SIGN_IN ?
                  'Create account?' :
                  'Login?'
                  }}
                </span>
                <v-btn
                  dark
                  round
                  class='ma-0'
                  @click='onSubmit'
                  :loading='authenticating'
                >{{curState === STATE_SIGN_IN ? 'LogIn' : 'SignUp'}}</v-btn>
              </div>
            </v-layout>
          </v-form>
        </v-flex>
        <v-flex md8 class='welcome-msg' v-if='$vuetify.breakpoint.mdAndUp'>
          <span class='welcome-msg__welcome'>Welcome to</span>
          <br>
          <app-logo size='6rem'></app-logo>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
// https://dribbble.com/shots/3586598-Bank-login-panel
import AppLogo from '../components/AppLogo'
import { mapActions } from 'vuex'
const STATE_SIGN_UP = 'SIGN_UP'
const STATE_SIGN_IN = 'SIGN_IN'

export default {
  components: { AppLogo },
  data () {
    return {
      STATE_SIGN_UP: STATE_SIGN_UP,
      STATE_SIGN_IN: STATE_SIGN_IN,
      curState: STATE_SIGN_IN,
      email: '',
      password: '',
      fullname: '',
      showPass: false,
      rules: {
        email: [val => /\S+@\S+\.\S+/.test(val.trim().toLowerCase()) || 'Please enter a valid email ID'],
        password: [val => val.length >= 8 || 'Password must have a minimum of 8 letters'],
        fullname: [val => !!val.trim().length || 'Please enter your full name']
      },
      authenticating: false
    }
  },
  methods: {
    toggleState () {
      this.curState = this.curState === this.STATE_SIGN_UP ? this.STATE_SIGN_IN : this.STATE_SIGN_UP
      this.$refs.form.reset()
      if (this.curState === this.STATE_SIGN_UP) this.$nextTick(this.$refs.fullNameField.focus)
      else this.$nextTick(this.$refs.emailField.focus)
    },
    async onSubmit (ev) {
      if (!this.$refs.form.validate()) return
      this.authenticating = true

      if (this.curState === this.STATE_SIGN_UP) {
        await this.signUp({
          email: this.email,
          password: this.password,
          fullname: this.fullname
        })
      } else {
        await this.login({
          email: this.email,
          password: this.password
        })
      }
      this.authenticating = false
    },
    ...mapActions('login', ['login', 'signUp'])
  },
  mounted () {
    this.$refs.emailField.focus()
  }
}
</script>
<style lang='stylus' scoped>
.login-view {
  background: url('../assets/img/login_bg.jpg') center center / cover fixed, linear-gradient(to right top, #000000, #3b3b3b, #777777, #b9b9b9, #ffffff) center center / cover fixed;

  &__content {
    position: relative;
  }
}

.logo {
  position: absolute;
  left: 20px;
  top: 10px;
}

.login-fields-container {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-msg {
  color: white;
  font-size: 3rem;
  line-height: 1;
  margin: auto 0;
  text-align: center;

  &__welcome {
    font-weight: 200;
  }
}

.btn-create-acct {
  transition: all 0.25s ease;

  &:hover {
    text-shadow: 0px 0px 1px gray;
    cursor: pointer;
  }
}
</style>
