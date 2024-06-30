<template>
  <div class="home-container">
    <h1 class="title">欢迎进入管理系统</h1>
    <button class="btn" @click="goToStudents">点击管理</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToStudents() {
      this.$router.push('/students')
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('/images/2.0.jpg'); /* 引用背景图片 */
  background-size: cover; /* 使背景图片覆盖整个容器 */
  background-position: center; /* 使背景图片居中 */
  padding: 20px;
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  font-family: '华文行楷', serif; /* 设置标题字体 */
}

.btn {
  font-size: 1rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 1);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: '华文新魏', sans-serif; /* 设置按钮字体 */
}

.btn:hover {
    background-color: white;
    color: rgba(0, 0, 0, 1);
}
</style>
