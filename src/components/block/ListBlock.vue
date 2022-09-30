<template>
  <div class="root">
    <article v-for="blog in blogList" :key="blog.id">
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
  </div>
</template>

<script>
export default {
  name: "ListBlock",
  props: {
    blogList: {
      type: Array,
      require: true,
      default() {
        return [{ title: "标题", description: "描述" }]
      }
    }
  },
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
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  article {
    display: flex;
    align-items: center;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 10px 20px;
    border: 1px solid @gray-color;
    border-radius: 5px;
    transition: 0.2s;
    cursor: pointer;

    > img {
      object-fit: cover;
      margin-left: 20px;
    }

    h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p{
      font-size: 14px;
      color: @gray-color-dep;
    }
  }

  article:hover {
    background-color: @gray-color;
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