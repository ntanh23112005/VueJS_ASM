<template>
    <NavBar></NavBar>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
            <h2 class="text-center mb-4">Thay đổi mật khẩu</h2>
            <form @submit.prevent="changePassword">
                <div class="mb-3">
                    <label for="currentPassword" class="form-label">Mật khẩu hiện tại</label>
                    <input type="password" id="currentPassword" v-model="currentPassword" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="newPassword" class="form-label">Mật khẩu mới</label>
                    <input type="password" id="newPassword" v-model="newPassword" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Nhập lại mật khẩu mới</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required>
                </div>
                <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
                <button type="submit" class="btn btn-primary w-100">Lưu thay đổi</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import router from "@/router";

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const changePassword = () => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const loggedUser = localStorage.getItem("logUser");

    const userIndex = registeredUsers.findIndex(user => user.username === loggedUser);

    // Xác thực và kiểm tra
    if (registeredUsers[userIndex].password != currentPassword.value) {
        errorMessage.value = "Mật khẩu hiện tại không đúng!";
        return;
    }
    if (newPassword.value != confirmPassword.value) {
        errorMessage.value = "Mật khẩu không khớp!";
        return;
    }

    // Cập nhật mật khẩu
    registeredUsers[userIndex].password = newPassword.value;
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Thay đổi mật khẩu thành công.',
            confirmButtonText: 'OK'
        });

    errorMessage.value = "";
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";

        router.push("/");
};
</script>
