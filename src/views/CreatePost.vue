<template>
    <NavBar></NavBar>
    <div class="container my-4">
        <h3 class="text-center text-danger fw-bold text-uppercase">
            {{ isEditing ? "Chỉnh sửa tin tức" : "Đăng tin tức mới" }}
        </h3>
        <form @submit.prevent="isEditing ? updateNews() : addNews()" class="mb-5">
            <div class="mb-3">
                <label for="title" class="form-label">Tiêu đề</label>
                <input v-model="newNews.title" type="text" id="title" class="form-control" placeholder="Nhập tiêu đề" required>
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Nội dung</label>
                <textarea v-model="newNews.content" id="content" class="form-control" rows="4" placeholder="Nhập nội dung" required></textarea>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Hình ảnh</label>
                <input type="file" id="image" class="form-control" @change="handleImageUpload" :required="!isEditing">
            </div>
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary" v-if="!isEditing">Đăng tin</button>
                <button type="button" class="btn btn-success" v-else @click="updateNews">Cập nhật</button>
                <button type="button" class="btn btn-secondary" v-if="isEditing" @click="cancelEdit">Hủy</button>
            </div>
        </form>

        <h3 class="text-center text-danger fw-bold text-uppercase">Tổng hợp tin tức</h3>
        <div class="row border-bottom pb-3 mb-3" v-for="(total, index) in totals" :key="index">
            <div class="col-md-3">
                <img :src="total.imgageTotal" alt="Ảnh" class="img-fluid">
            </div>
            <div class="col-md-9">
                <h5 class="fw-bold">{{ total.title }}</h5>
                <p>{{ total.content }}</p>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary" @click="editNews(index)">Sửa</button>
                    <button class="btn btn-danger" @click="deleteNews(index)">Xóa</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from './NavBar.vue';
import Swal from 'sweetalert2';
import { ref, onMounted } from "vue";

const totals = ref([]);

// Biến để lưu bài viết mới hoặc chỉnh sửa
const newNews = ref({ title: "", content: "", imgageTotal: "" });
const isEditing = ref(false);
const editIndex = ref(null);

const saveToLocalStorage = () => {
    localStorage.setItem('totals', JSON.stringify(totals.value));
};

// Khởi tạo dữ liệu từ LS
onMounted(() => {
    const storedData = JSON.parse(localStorage.getItem('totals')) || [];
    totals.value = storedData;
});

// Thêm bài viết
const addNews = () => {
    if (newNews.value.title && newNews.value.content && newNews.value.imgageTotal) {
        totals.value.push({ ...newNews.value }); // Thêm bài viết vào mảng
        saveToLocalStorage(); // Cập nhật LS
        resetForm(); // Đặt lại form
        Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Bài viết đã được thêm.',
            confirmButtonText: 'OK',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Thất bại!',
            text: 'Bạn phải điền đầy đủ thông tin.',
            confirmButtonText: 'OK',
        });
    }
};

// Xóa bài viết
const deleteNews = (index) => {
    totals.value.splice(index, 1); // Xóa bài viết theo chỉ số
    saveToLocalStorage(); // Cập nhật LS
    Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Bài viết đã được xóa.',
        confirmButtonText: 'OK',
    });
};

// Chỉnh sửa bài viết
const editNews = (index) => {
    const selectedNews = totals.value[index];
    newNews.value = { ...selectedNews };
    isEditing.value = true;
    editIndex.value = index;
};

// Cập nhật bài viết
const updateNews = () => {
    if (newNews.value.title && newNews.value.content && newNews.value.imgageTotal) {
        totals.value[editIndex.value] = { ...newNews.value }; // Cập nhật nội dung bài viết
        saveToLocalStorage(); // Cập nhật LS
        resetForm(); // Đặt lại form
        Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Bài viết đã được cập nhật.',
            confirmButtonText: 'OK',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Thất bại!',
            text: 'Bạn phải điền đầy đủ thông tin.',
            confirmButtonText: 'OK',
        });
    }
};

// Hủy chỉnh sửa
const cancelEdit = () => {
    resetForm();
};

// Xử lý tải lên ảnh
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            newNews.value.imgageTotal = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

// Đặt lại form
const resetForm = () => {
    newNews.value = { title: "", content: "", imgageTotal: "" };
    isEditing.value = false;
    editIndex.value = null;
};
</script>

<style scoped>
.dropdown-menu {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-menu .dropdown-item:hover {
    background-color: #f0f0f0;
}
</style>
