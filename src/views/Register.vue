<template>
    <div class="register-container d-flex justify-content-center align-items-center">
        <div class="card p-4 shadow-lg" style="width: 400px;">
            <h3 class="text-center mb-4">Đăng Ký</h3>
            <form @submit.prevent="checkRegister()">
                <div class="mb-3">
                    <label for="username" class="form-label">Tên tài khoản:</label>
                    <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mật khẩu:</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <div class="mb-3">
                    <label for="repassword" class="form-label">Nhập lại mật khẩu:</label>
                    <input type="password" class="form-control" id="repassword" v-model="repassword" required>
                </div>
                <p style="color: red;">{{ errorMessage }}</p>
                <button type="submit" class="btn btn-primary w-100">Đăng Ký</button>
                <div class="text-center mt-3">
                    <router-link to="/login"  class="text-secondary">Quay lại đăng nhập</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { ref } from "vue";
import { useRouter } from 'vue-router';

const route = useRouter();

const id = ref(0);
const username = ref('');
const password = ref('');
const repassword = ref('');
const errorMessage = ref('');

const checkRegister = () => {
    if (password.value !== repassword.value) {
        errorMessage.value = 'Mật khẩu không khớp, vui lòng kiểm tra lại';
        return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const existingUser = registeredUsers.find(user => user.username == username.value);
    if (existingUser) {
        errorMessage.value = 'Tên tài khoản đã tồn tại. Vui lòng chọn tên khác.';
        return;
    }

    registeredUsers.push({id:registeredUsers.length+1, username: username.value, password: password.value });

    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Đăng kí thành công.',
        confirmButtonText: 'OK'
    });
    route.push('/login');
}
</script>

<style scoped>
.register-container {
    min-height: 100vh;
    padding: 2rem;
}

.card {
    border-radius: 10px;
}
</style>
