<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-info shadow-sm sticky-top">
        <div class="container">
            <router-link to="/" class="navbar-brand">
                <img src="/img/logo-unbackground.png" alt="Logo" class="img-fluid" style="height: 75px;">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link"><strong>Bài viết</strong></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/createPost" class="nav-link"><strong>Tạo sách</strong></router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <a href="#" class="nav-link"><strong>Bảng xếp hạng</strong></a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link"><strong>Chuyển nhượng</strong></a>
                    </li> -->
                </ul>

                <div class="input-group w-auto ms-2">
                    <input type="text" class="form-control" placeholder="Tìm kiếm bài viết ...">
                    <button type="button" class="btn btn-secondary">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                <div class="dropdown ms-3">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img src="/img/avatar.png" alt="Avatar" class="rounded-circle" style="width: 50px;">
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <router-link to="/login" class="dropdown-item" v-if="!isAuthenticated()">
                                Đăng nhập
                            </router-link>
                            <button class="dropdown-item" :disabled="true" v-else>Đăng nhập</button>
                        </li>
                        <li><router-link to="/changePass" class="dropdown-item">Đổi mật khẩu</router-link></li>
                        <li><button @click="logout" class="dropdown-item">Đăng xuất</button></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const isAuthenticated = () => !!localStorage.getItem('logUser');
const router = useRouter();

const logout = () => {
    Swal.fire({
        icon: 'question',
        title: 'Bạn có chắc chắn?',
        text: 'Hành động này sẽ không thể hoàn tác.',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Đã đăng xuất',
                text: 'Đăng xuất thành công',
                confirmButtonText: 'OK'
            });
            localStorage.removeItem('logUser');
            
            router.push('/login');
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Đã hủy!',
                text: 'Hủy đăng xuất',
                confirmButtonText: 'OK'
            });
        }
    });
};
</script>

<style scoped>
.nav-link {
    transition: color 0.3s;
}

.nav-link:hover {
    color: #cbe4ff;
}

.nav-item img {
    transition: transform 0.3s;
}
</style>
