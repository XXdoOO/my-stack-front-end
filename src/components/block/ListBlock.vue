<template>
  <div class="root">
    <div id="top"></div>

    <article v-for="blog in $store.state.blogList" :key="blog.id">
      <div>
        <ul class="topContent">
          <li>
            <router-link to="">{{blog.authorUsername}}</router-link>
          </li>
          <li>{{formatTime(blog.postTime)}}</li>
        </ul>
        <h2>{{blog.title}}</h2>
        <p>{{blog.description}}</p>
        <ul class="bottomContent">
          <li title="顶数">
            <i title="顶"></i>
            <span>{{blog.up}}</span>
          </li>
          <li title="踩数">
            <i title="踩"></i>
            <span>{{blog.down}}</span>
          </li>
          <li title="收藏数">
            <i title="收藏"></i>
            <span>{{blog.star}}</span>
          </li>
          <li title="浏览数">
            <i></i>
            <span>{{blog.views}}</span>
          </li>
        </ul>
      </div>
      <img v-if="blog.cover" :src="blog.cover" alt="" height="100">
    </article>

    <i @click="goAnchor('top')" class="goTop" title="返回顶部"></i>
  </div>
</template>

<script>

export default {
  name: "ListBlock",
  methods: {
    formatTime(timestamp) {
      let date = new Date(timestamp);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hours = date.getHours();
      let seconds = date.getSeconds();
      let minutes = date.getMinutes();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      return `${year}-${month}-${strDate} ${hours}:${seconds}:${minutes}`;
    },
    goAnchor(id) {
      var anchor = document.getElementById(id);
      // chrome
      document.body.scrollTop = anchor.offsetTop - 80;
      // firefox
      document.documentElement.scrollTop = anchor.offsetTop - 80;
      // safari
      window.pageYOffset = anchor.offsetTop - 80;
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  padding-top: 80px;

  article {
    display: flex;
    align-items: center;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto 7px auto;
    padding: 15px 20px;
    border-radius: 5px;
    transition: 0.1s;
    cursor: pointer;
    background-color: white;

    >img {
      object-fit: cover;
      margin-left: 20px;
    }

    h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      color: @gray-color-dep;
      transition: 0.1s;
    }
  }

  article:hover {
    background-color: #f4f5f6;
    color: @theme-color;
  }

  article:hover p {
    color: @theme-color;
  }

  .goTop {
    position: fixed;
    right: 50px;
    bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    padding: 20px;
    background-color: @theme-color;
    background-image: url(../../assets/img/arrow.png);
    background-size: cover;
    color: white;
    border-radius: 50%;
    transform: rotate(180deg);
    cursor: pointer;
  }
}

.topContent {
  display: flex;
  margin-bottom: 10px;

  li {
    padding: 0 10px;
    color: @gray-color-dep;
  }

  li:first-child {
    border-right: 2px solid @gray-color;
    padding-left: 0;
  }
}

.bottomContent {
  display: flex;
  margin-top: 10px;

  li {
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;

    i {
      width: 20px;
      height: 20px;
      display: block;
      background-size: cover;
      transition: @transition-time;
    }

    span {
      font-size: 14px;
      line-height: 14px;
      color: @gray-color-dep;
    }
  }

  li:first-child {
    padding-left: 0;
  }

  li:first-child i {
    background-image: url(../../assets/img/up.png);
  }

  li:first-child i:hover,
  li:nth-child(2) i:hover {
    background-image: url(../../assets/img/up-hover.png);
  }

  li:nth-child(2) i {
    background-image: url(../../assets/img/up.png);
    transform: rotate(180deg);
  }

  li:nth-child(3) i {
    background-image: url(../../assets/img/star.png);
  }

  li:nth-child(3) i:hover {
    background-image: url(../../assets/img/star-hover.png);
  }

  li:nth-child(4) i {
    background-image: url(../../assets/img/views.png);
  }
}
</style>