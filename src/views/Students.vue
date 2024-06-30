<template>
  <div class="page-container">
    <div class="students-container">
      <h1>学生列表</h1>
      <div class="add-student-container">
        <input 
          v-model="newStudentId" 
          placeholder="输入学号" 
          maxlength="7"
        />
        <input 
          v-model="newStudentName" 
          placeholder="输入学生姓名" 
        />
        <input 
          v-model.number="newStudentAge" 
          placeholder="输入年龄" 
          type="number" 
        />
        <button class="btn add-btn" @click="validateAndAddStudent">添加学生</button>
      </div>
      <table class="students-table">
        <thead>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.age }}</td>
            <td>
              <button class="btn edit-btn" @click="editStudent(index)">编辑</button>
              <button class="btn delete-btn" @click="deleteStudent(index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="editingIndex !== null" class="edit-container">
        <input 
          v-model="newStudentId" 
          placeholder="输入学号" 
          maxlength="7" 
        />
        <input 
          v-model="newStudentName" 
          placeholder="输入学生姓名" 
        />
        <input 
          v-model.number="newStudentAge" 
          placeholder="输入年龄" 
          type="number" 
        />
        <button class="btn save-btn" @click="validateAndSaveStudent">保存</button>
        <button class="btn cancel-btn" @click="cancelEdit">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [],
      newStudentId: '',
      newStudentName: '',
      newStudentAge: null,
      editingIndex: null,
    }
  },
  mounted() {
    this.loadStudents();
  },
  methods: {
    loadStudents() {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        this.students = JSON.parse(savedStudents);
      }
    },
    saveStudents() {
      localStorage.setItem('students', JSON.stringify(this.students));
    },
    validateAndAddStudent() {
      if (!this.newStudentId || !this.newStudentName || !this.newStudentAge) {
        alert("请填写所有字段!");
      } else {
        if (this.newStudentId.length !== 7) {
          alert("学号必须为七位数!");
        } else if (this.students.some(student => student.id === this.newStudentId)) {
          alert("学号已存在，请使用其他学号!");
        } else if (isNaN(this.newStudentAge) || this.newStudentAge < 17 || this.newStudentAge > 25) {
          alert("年龄输入错误，应在17到25之间!");
        } else {
          this.addStudent();
        }
      }
    },
    validateAndSaveStudent() {
      if (!this.newStudentId || !this.newStudentName || !this.newStudentAge) {
        alert("请填写所有字段!");
      } else {
        if (this.newStudentId.length !== 7) {
          alert("学号必须为七位数!");
        } else if (this.students.some(
          (student, index) => student.id === this.newStudentId && index !== this.editingIndex
        )) {
          alert("学号已存在，请使用其他学号!");
        } else if (isNaN(this.newStudentAge) || this.newStudentAge < 17 || this.newStudentAge > 25) {
          alert("年龄输入错误，应在17到25之间!");
        } else {
          this.saveStudent();
        }
      }
    },
    addStudent() {
      const newStudent = {
        id: this.newStudentId,
        name: this.newStudentName,
        age: this.newStudentAge,
      };
      this.students.push(newStudent);
      this.saveStudents();
      this.resetForm();
    },
    deleteStudent(index) {
      this.students.splice(index, 1);
      this.saveStudents();
    },
    editStudent(index) {
      const student = this.students[index];
      this.newStudentId = student.id;
      this.newStudentName = student.name;
      this.newStudentAge = student.age;
      this.editingIndex = index;
    },
    saveStudent() {
      const updatedStudent = {
        id: this.newStudentId,
        name: this.newStudentName,
        age: this.newStudentAge,
      };
      this.students.splice(this.editingIndex, 1); // 先删除旧的学生信息
      this.students.unshift(updatedStudent); // 将更新后的学生信息移到第一位
      this.saveStudents();
      this.editingIndex = null;
      this.resetForm();
    },
    cancelEdit() {
      this.editingIndex = null;
      this.resetForm();
    },
    resetForm() {
      this.newStudentId = '';
      this.newStudentName = '';
      this.newStudentAge = null;
    },
  },
}
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 将整个页面高度设为视窗高度 */
  background-image: url('/images/1.0.jpg'); /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
}

.students-container {
  width: 80%; /* 设置学生列表容器宽度 */
  max-width: 800px; /* 最大宽度限制 */
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.75); /* 设置半透明白色背景 */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  font-family: '黑体', sans-serif;
}

.add-student-container,
.edit-container {
  display: flex;
  align-items: center;
  justify-content: center; /* 水平居中 */
  margin-bottom: 20px;
}

.add-student-container input,
.edit-container input {
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: '宋体', sans-serif;
}

.students-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  text-align: center;
}

.students-table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: 21px;
  font-family: '宋体', sans-serif;
}

.students-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: 20px;
  font-family: '华文行楷', sans-serif;
}

.students-table th {
  background-color: #f2f2f2;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
}

.btn:hover {
  background-color: white;
  color: rgba(0, 0, 0, 1);
}

.add-btn {
  color: #fff;
  background-color: rgba(0, 0, 0, 1);
  font-family: '华文新魏', sans-serif;
}

.add-btn:hover {
  background-color: white;
  color: rgba(0, 0, 0, 1);
}

.edit-btn {
  color: #fff;
  background-color: rgba(0, 0, 0, 1);
  font-family: '华文新魏', sans-serif;
}

.edit-btn:hover {
  background-color: white;
  color: rgba(0, 0, 0, 1);
}

.delete-btn {
  background-color: #f44336;
  color: white;
  font-family: '华文新魏', sans-serif;
}

.save-btn{
  background-color: #2196f3;
  color: white;
  font-family: '华文新魏', sans-serif;
}

.cancel-btn {
  background-color: rgba(0, 0, 0, 1);
  color: white;
  font-family: '华文新魏', sans-serif;
}
</style>
