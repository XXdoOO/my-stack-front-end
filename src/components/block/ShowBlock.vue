<template>
  <div class="container show-block">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide swiper-slide1"
          style="
            background-image: url(https://onlydroneparts.com/wp-content/uploads/2022/08/motor-for-drone.png);
            background-size: cover;
            background-position: center;
          "
        >
          <article>
            <router-link to="/">
              <h1>Motor for Drone</h1>
              <p>
                A drone cannot fly without a motor for drone. This article will
                take you to understand the role of drone motors.
              </p>
            </router-link>
          </article>
        </div>
      </div>
      <div class="swiper-pagination"></div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div>
      <article>
        <router-link to="/">
          <img
            src="https://onlydroneparts.com/wp-content/uploads/2022/08/motor-for-drone.png"
            alt=""
          />
          <div class="content">
            <h2 class="title">Motor for Drone</h2>
            <p class="description p1">
              A drone cannot fly without a motor for drone. This article will
              take you to understand the role of drone motors.
            </p>
          </div>
        </router-link>
      </article>
    </div>
    <div>
      <article>
        <router-link to="/">
          <img
            src="https://onlydroneparts.com/wp-content/uploads/2022/08/motor-for-drone.png"
            alt=""
          />
          <div class="content">
            <h3>Motor for Drone</h3>
            <p>
              A drone cannot fly without a motor for drone. This article will
              take you to understand the role of drone motors.
            </p>
          </div>
        </router-link>
      </article>
    </div>
    <div>
      <article>
        <router-link to="/">
          <img
            src="https://onlydroneparts.com/wp-content/uploads/2022/08/motor-for-drone.png"
            alt=""
          />
          <div class="content">
            <h3 class="title">Motor for Drone</h3>
            <p>
              A drone cannot fly without a motor for drone. This article will
              take you to understand the role of drone motors.
            </p>
          </div>
        </router-link>
      </article>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "ShowBlock",
  data() {
    return {};
  },
  mounted() {
    new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // autoplay: true,
      loop: true,
    });
  },
};
</script>
<style lang="less" scoped>
.show-block {
  display: grid;
  grid-template-rows: 230px 230px;
  grid-template-columns: 50% calc(25% - 10px) calc(25% - 10px);
  gap: 20px;
  padding: 50px 0;

  > div {
    border-radius: 5px;
    overflow: hidden;
  }

  .swiper-container {
    width: 100%;
    height: 100%;
    grid-row-start: 1;
    grid-row-end: 3;

    .swiper-slide {
      article {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);

        a {
          color: white;
          text-align: center;
          width: 60%;

          h1 {
            position: relative;
            margin-bottom: 40px;
          }

          h1::before {
            content: "";
            position: absolute;
            bottom: -5px;
            left: calc(50% - 30px);
            width: 60px;
            height: 3px;
            background-color: white;
            border-radius: 5px;
          }
        }
      }
    }
  }

  > div:nth-child(2) {
    background-color: green;
    grid-column-start: 2;
    grid-column-end: 4;
  }
  > div:nth-child(3) {
    background-color: blue;
  }

  > div:nth-child(4) {
    background-color: yellow;
  }
}
</style>