<template>
  <div class="home">
    <div class="container mx-auto">
      <div class="vacancy">
        <h1 class="text-2xl font-black tracking-wider leading-relaxed uppercase mb-5">{{title}}</h1>
        <ul v-if="posts && posts.length ">
          <li
            v-for="(post, index) of posts"
            :key="index"
            class="vacancy-card flex md:h-52 h-64 bg-white border-4 m-2 p-3.5 rounded-lg flex-row"
          >
            <div
              class="vacancy-card__title flex md:flex-row flex-col-reverse justify-between w-full"
            >
              <div class="picture-title flex flex-row md:w-4/5" @click="goTodetail(post.id)">
                <div class="picture h-16 w-16 md:h-24 md:w-24">
                  <img
                    :src="post.pictures"
                    class="rounded-full w-full h-full"
                    alt
                    :srcset="'https://picsum.photos/200/300' + '?random=' + post.id"
                  />
                </div>
                <div class="title-address flex flex-col w-3/5 mx-7 justify-between">
                  <h2 class="text-lg lg:text-2xl font-bold text-left">{{post.title}}</h2>
                  <p class="text-left text-base">Department name {{post.address}}</p>
                </div>
              </div>
              <div class="rate-posted flex flex-row md:flex-col h-full justify-between md:w-2/5">
                <span class="fav h-6 bg-right md:block hidden sm:hidden bg-no-repeat"></span>
                <div class="rate flex justify-start w-full h-6">
                  <star-rating
                    v-model:rating="rating"
                    v-bind:increment="1"
                    v-bind:max-rating="5"
                    inactive-color="#e5e7eb"
                    active-color="#5297af"
                    :rating="3"
                    :show-rating="false"
                    v-bind:star-size="30"
                    border-color="white"
                    active-border-color="#0000"
                    animate="true"
                  ></star-rating>
                </div>
                <p class="flex justify-end text-base w-full">Posted {{post.posted}}</p>
              </div>
            </div>
          </li>
        </ul>

        <ul v-if="errors && errors.length">
          <li v-for="error of errors">{{error.message}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import moment from "moment";
import { Options, Vue } from "vue-class-component";
import StarRating from "vue-star-rating";
import AboutView from "@/views/AboutView.vue"; // @ is an alias to /src

export default {
  components: {
    AboutView,
    StarRating
  },

  name: "home",
  data() {
    return {
      posts: [],
      errors: [],
      title: "Vacancies"
    };
  },
  methods: {
    goTodetail(id) {
      this.$router.push({ name: "about", params: { Pid: id } });
    }
  },

  // Pulls posts when the component is created.
  created() {
    axios
      .get(
        `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu`
      )
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data.map(post => ({
          ...post,
          posted: moment(post.createdAt, "YYYYMMDD").fromNow()
        }));
      })

      .catch(e => {
        this.errors.push(e);
      });
  },

  mounted() {
    const moment = require("moment");
    const rate = document.getElementsByClassName("rate-star");
  }
};
</script>
<style lang="scss">
body {
  background: #5fafcb0f;
}
.fav {
  background-image: url("../assets/rate.png");
}
.share {
  background-image: url("../assets/share.png");
}

%visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.star-rating {
  &__star {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 1.5em;
    color: #ababab;
    transition: color 0.2s ease-out;

    &:hover {
      cursor: pointer;
    }

    &.is-selected {
      color: #ffd700;
    }

    &.is-disabled:hover {
      cursor: default;
    }
  }

  &__checkbox {
    @extend %visually-hidden;
  }
}
</style>