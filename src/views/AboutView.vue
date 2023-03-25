<template>
  <div class="about">
    <div class="container mx-auto" v-for="(post, index) of posts" :key="index">
      <div class="details flex inline-flex justify-between flex-wrap" v-if="id == post.id">
        <div class="details-info flex flex-col justify-between justify-start w-100 lg:w-1/2">
          <div class="details-info__title flex flex-row w-full justify-between">
            <h2 class="text-2xl font-bold">Job details</h2>
            <div class="flex flex-row items-center">
              <span class="fav h-6 w-40 bg-no-repeat">Save to my list</span>
              <span class="share bg-no-repeat h-6 w-24">Share</span>
            </div>
          </div>
          <hr />
          <button class="apply rounded-lg w-32 p-4 text-white my-4 hover:bg-cyan-600">Apply</button>
          <div class="details-info__title text-left flex flex-row justify-between">
            <h2 class="text-2xl font-bold w-8/12">{{post.title}}</h2>
            <div class="flex flex-col w-40">
              <h2 class="text-2xl font-bold">{{post.salary}}</h2>
              <p class="text-base">Brutto per year</p>
            </div>
          </div>
          <div class="description text-left mb-16">
            <p class="text-base">Posted {{post.posted}}</p>
            <span v-html="post.descr"></span>
            <button class="apply rounded-lg w-32 p-4 text-white my-4 hover:bg-cyan-600">Apply</button>
          </div>
          <div class="additional text-left mb-16">
            <h2 class="text-2xl font-bold">Additional info</h2>
            <hr />
            <div class="additional-employment text-left my-4">
              <p>Employment type</p>
              <ul v-if="id == post.id" class="flex flex-row">
                <li
                  v-for="(employment, index) of post.employment_type"
                  :key="index"
                  class="bg-violet-200 border-violet-300 border h-12 w-52 flex items-center justify-center rounded-lg mr-2.5"
                >{{employment}}</li>
              </ul>
            </div>
            <div class="additional-benefits text-left">
              <p>Benefits</p>
              <ul class="flex flex-row" v-if="id == post.id">
                <li
                  v-for="(benefit, index) of post.benefits"
                  :key="index"
                  class="bg-blue-200 border-blue-300 border h-12 w-52 flex items-center justify-center rounded-lg mr-2.5"
                >{{benefit}}</li>
              </ul>
            </div>
          </div>

          <div class="attached text-left mb-16">
            <h2 class="text-2xl font-bold">Attached images</h2>
            <hr />

            <div class="attached-img flex flex-row my-4">
              <img
                :src="post.pictures"
                class="rounded-lg w-52 h-24"
                alt
                :srcset="'https://picsum.photos/200/300' + '?random=' + post.id"
              />
              <img
                :src="post.pictures"
                class="rounded-lg w-52 h-24 ml-2.5"
                alt
                :srcset="'https://picsum.photos/200/300' + '?random=3' + post.id"
              />
              <img
                :src="post.pictures"
                class="rounded-lg w-52 h-24 ml-2.5"
                alt
                :srcset="'https://picsum.photos/200/300' + '?random=1' + post.id"
              />
            </div>
          </div>
          <button class="return p-4 rounded-lg w-52 my-4 mb-16 hover:bg-cyan-100">
            <a href="/">Return to job board</a>
          </button>
        </div>
        <div class="map-title lg:hidden sm:visible w-full">
          <h2 class="text-2xl font-bold text-left">Contacts</h2>
          <hr />
        </div>
        <div
          class="details-map text-slate-200 w-100 rounded-lg lg:mr-0 mt-5 lg:mt-0 sm:mx-auto sm:my-4"
        >
          <div class="details-map__address text-slate-200 text-left pl-14 pt-14">
            <p class="text-xl font-bold text-base">
              Department name
              <br />
              {{post.name}}
            </p>
            <p>{{post.address}}</p>
            <p>{{post.phone}}</p>
            <p>{{post.email}}</p>
          </div>

          <Maps />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import moment from "moment";
import Maps from "@/components/Maps.vue";

export default {
  components: {
    Maps
  },

  name: "about",
  data() {
    return {
      posts: [],
      id: this.$route.params.Pid,
      title: "about",
      descr: "",
      benefs: [],
      show: true
    };
  },
  created() {
    axios
      .get(
        `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu`
      )
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data.map(post => ({
          ...post,

          posted: moment(post.createdAt, "YYYYMMDD").fromNow(),

          descr: post.description
            .split("\n")
            .join("<br>")
            .replace(/Responsopilities:/g, "<b>Responsopilities:</b>")
            .replace(
              /Compensation & Benefits:/g,
              "<b>Compensation & Benefits:</b>"
            ),
          benefs: post.benefits
        }));
      });
  },

  mounted() {
    const moment = require("moment");
  }
};
</script>
<style lang="scss">
$grey: #4c4c4c;
$black: #211f21;
.details-map {
  overflow: hidden !important;
  position: relative;
  height: 436px;
  width: 402px;
  background-color: $grey;
  &::before {
    position: absolute;
    width: 273px;
    height: 273px;
    content: "";
    border-radius: 50%;
    background: $black;
    left: -44px;
    top: -25px;
  }
  &__address {
    height: 218px;
    position: relative;
  }
}
img {
}

hr {
  border: 1px solid #3845642c;
}
.return {
  background: #5fafcb63;
  color: $grey;
  & a {
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;

    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background-image: url("../assets/Arrow.png");
      background-repeat: no-repeat;
      position: absolute;
      margin-left: -20px;
      margin-top: 4px;
    }
  }
}
.apply {
  background: $grey;
}

img {
  // opacity:0;
  margin-right: 100%;
  overflow: hidden;
  animation: show 0s forwards ease-in;
}

@keyframes show {
  from {
    margin-right: 100%;
    width: 300%;
  }
  to {
    margin-right: 0%;
    width: 100%;
  }
}
img:nth-child(1) {
  animation: show 1s forwards ease-in;
  animation-delay: 0s;
}
img:nth-child(2) {
  animation: show 1s forwards ease-in;
  animation-delay: 0s;
}
img:nth-child(3) {
  animation: show 1s forwards ease-in;
  animation-delay: 0s;
}
</style>