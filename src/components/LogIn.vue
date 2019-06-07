<template>
  <div class="container">
    <h1 class="col-sm-4 offset-sm-4">Log In</h1>
    <form class="form" @submit="checkForm" ref="form">
      <div class="form-group">
        <label class="control-label col-sm-2" for="inputEmail">Email</label>
        <div class="col-sm-4 offset-sm-4">
          <input
            name="email"
            placeholder="example@domain.com"
            type="text"
            v-model="email"
            class="form-control"
          >
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="inputPassword">Password</label>
        <div class="col-sm-4 offset-sm-4">
          <input
            name="password"
            placeholder="Must have at least 6 characters"
            type="current-password"
            v-model="password"
            class="form-control"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-12">
          <button class="btn btn-primary">Log In</button>
        </div>
      </div>
      <div class="col-sm-4 offset-sm-4 text-danger" v-if="errors.length">
        <div v-for="(error, index) in errors" v-bind:key="index">{{ error }}</div>
      </div>
      <div class="col-sm-4 offset-sm-4 text-danger" v-if="error">{{error.message}}</div>
      <div class="col-sm-4 offset-sm-4 text-success" v-if="user">Logged In</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];

      if (!this.email) {
        this.errors.push("Email required");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required");
      } else if (!this.password) {
        this.errors.push("Password required");
      } else if (this.password.length < 6) {
        this.errors.push("Password must be at least 6 characters long");
      }

      if (!this.errors.length) {
        this.submit();
      }

      e.preventDefault();
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    submit() {
      this.$store.dispatch("logIn", {
        email: this.email,
        password: this.password
      });
      (this.email = ""), (this.password = "");
    }
  }
};
</script>

<style>
.container h1 {
  animation: fadein 2s;
  margin-bottom: 40px;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.control-label {
  position: relative;
  animation: left 1s;
}

@keyframes left {
  from {
    left: -50px;
  }
  to {
    left: 0px;
  }
}

.form-group input {
  position: relative;
  animation: right 1s;
}

@keyframes right {
  from {
    left: 50px;
  }
  to {
    left: 0px;
  }
}

.btn {
  margin-top: 30px;
  animation: fadehalf 2s;
}

@keyframes fadehalf {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

.col-sm-4.text-danger,
.col-sm-4.text-success {
  margin-top: 20px;
}
</style>