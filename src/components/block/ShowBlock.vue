<template>
  <div class="container show-block">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-slide1" style="
            background-image: url(../../assets/img/cover.webp);
            background-size: cover;
            background-position: center;
          ">
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
    <article>
      <router-link to="/">
        <img src="../../assets/img/cover.webp" alt="" />
        <div class="content">
          <h2 class="title">Motor for Drone</h2>
          <p class="description p1">
            A drone cannot fly without a motor for drone. This article will take
            you to understand the role of drone motors.
          </p>
          <ul>
            <li>
              <i></i>
              <span>1000</span>
            </li>
            <li>
              <i></i>
              <span>1000</span>
            </li>
            <li>
              <i></i>
              <span>1000</span>
            </li>
            <li>
              <i></i>
              <span>1000</span>
            </li>
          </ul>
        </div>
        <div class="top">TOP 1</div>
      </router-link>
    </article>
    <article>
      <router-link to="/">
        <img src="../../assets/img/cover.webp" alt="" />
        <div class="content">
          <h2>Motor for Drone</h2>
          <p>
            A drone cannot fly without a motor for drone. This article will take
            you to understand the role of drone motors.
          </p>
          <ul>
            <li>
              <i></i>
              <span>1000</span>
            </li>
            <li>
              <i></i>
              <span>1000</span>
            </li>
            <li>
              <i></i>
              <span>1000</span>
            </li>
            <li>
              <i></i>
              <span>1000</span>
            </li>
          </ul>
        </div>
        <div class="top">TOP 2</div>
      </router-link>
    </article>
    <article>
      <router-link to="/">
        <img src="../../assets/img/cover.webp" alt="" />
        <div class="content">
          <h2 class="title">Motor for Drone</h2>
          <p>
            A drone cannot fly without a motor for drone. This article will take
            you to understand the role of drone motors.
          </p>
          <ul>
            <li>
              <i></i>
              <span>1000</span>
            </li>
            <li>
              <i></i>
              <span>1000</span>
            </li>
            <li>
              <i></i>
              <span>1000</span>
            </li>
            <li>
              <i></i>
              <span>1000</span>
            </li>
          </ul>
        </div>
        <div class="top">TOP 3</div>
      </router-link>
    </article>
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
  grid-template-rows: 200px 400px;
  grid-template-columns: 50% calc(25% - 10px) calc(25% - 10px);
  gap: 20px;
  padding: 50px 0;

  .swiper-container {
    width: 100%;
    height: 100%;
    grid-row-start: 1;
    grid-row-end: 3;
    border-radius: 5px;
    overflow: hidden;

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

  >article {
    border-radius: 5px;
    overflow: hidden;
    box-shadow: @shadow-color;

    a {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;

      .top {
        position: absolute;
        right: 0;
        padding: 1% 2%;
        background-color: @theme-color;
        color: white;
        font-weight: bold;
      }

      .top:first-of-type {
        font-size: 20px;
      }

      .content {
        position: relative;
        padding: 15px 20px;
        flex-grow: 1;

        h2 {
          margin-bottom: 10px;
        }
      }

      ul {
        position: absolute;
        bottom: 20px;
        display: flex;
        align-items: center;

        li {
          display: flex;
          align-items: center;
          margin-right: 10px;

          span {
            height: 17.5px;
            font-size: 10px;
            transition: @transition-time;
          }
        }

        li i {
          width: 20px;
          height: 20px;
          display: block;
          background-size: cover;
          transition: @transition-time;
        }

        li:first-child i {
          background-image: url(../../assets/img/up.png);
        }

        li:first-child:hover i {
          background-image: url(../../assets/img/up-hover.png);
        }

        li:first-child:hover {
          color: @theme-color;
        }

        li:nth-child(2) i {
          transform: rotate(180deg);
          background-image: url(../../assets/img/up.png);
        }

        li:nth-child(2):hover i {
          background-image: url(../../assets/img/up-hover.png);
        }

        li:nth-child(2):hover {
          color: @theme-color;
        }

        li:nth-child(3) i {
          background-image: url(../../assets/img/star.png);
        }

        li:nth-child(3):hover i {
          background-image: url(../../assets/img/star-hover.png);
        }

        li:nth-child(3):hover {
          color: @theme-color;
        }

        li:nth-child(4) i {
          background-image: url(../../assets/img/view.png);
        }
      }
    }
  }

  >article:nth-child(2) {
    grid-column-start: 2;
    grid-column-end: 4;

    >img {
      width: calc(50% - 10px);
      height: 100%;
    }

    .top {
      font-size: 23px;
      top: 0;
    }
  }

  >article:nth-child(3),
  >article:nth-child(4) {
    a {
      flex-direction: column;
    }

    >img {
      width: 100%;
      height: 50%;
    }

    .top {
      bottom: 0;
    }
  }
}
</style>