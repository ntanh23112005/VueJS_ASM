<template>
    <div class="login-container d-flex justify-content-center align-items-center">
        <div class="card p-4 shadow-lg" style="width: 400px;">
            <h3 class="text-center mb-4">Đăng Nhập</h3>
            <form @submit.prevent="checkLogin()">
                <div class="mb-3">
                    <label for="text" class="form-label">Tên tài khoản:</label>
                    <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mật khẩu:</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <p style="color: red;">{{ errorMessage }}</p>
                <button type="submit" class="btn btn-primary w-100">Đăng Nhập</button>
                <div class="text-center mt-3">
                    <router-link to="/register" class="text-secondary">Đăng kí tài khoản</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from "vue";
import Swal from 'sweetalert2';

const router = useRouter();

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const checkLogin = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));

    if (registeredUsers) {
        const userFound = registeredUsers.find(user => user.username === username.value && user.password === password.value);

        if (userFound) {
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Đăng nhập thành công.',
                confirmButtonText: 'OK'
            });
            localStorage.setItem('logUser', username.value);
            router.push('/');
        } else {
            errorMessage.value = 'Tài khoản hoặc mật khẩu không chính xác';
        }
    } else {
        errorMessage.value = 'Không tìm thấy người dùng đã đăng ký';
    }
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    padding: 2rem;
}

.card {
    border-radius: 10px;
}
</style>