<template>
     <!-- <nav class="navbar navbar-expand-lg navbar-light bg-info shadow-sm sticky-top">
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
                        <a href="#" class="nav-link"><strong>Bài viết</strong></a>
                    </li>
                    <li class="nav-item">
                        <router-link to="/createPost" class="nav-link"><strong>Đăng bài</strong></router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link"><strong>Bảng xếp hạng</strong></a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link"><strong>Chuyển nhượng</strong></a>
                    </li>
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
                        <li><a href="#" class="dropdown-item">Đổi mật khẩu</a></li>
                        <li><button @click="logout" class="dropdown-item">Đăng xuất</button></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav> -->


        <NavBar></NavBar>
    <div class="container my-5">
        <div class="row">
            <div class="col-lg-8 mb-4">
                <h1 class="text-primary text-center fw-bold">{{ post.title }}</h1>
                <img :src="post.imageNews" class="img-fluid rounded shadow-sm mb-4" alt="">
                <p>{{ post.content }}</p>
                <h2 class="text-secondary fw-bold mt-4">Phương pháp tập luyện</h2>
                <p>Các bài tập Pilates giúp phục hồi hiệu quả cột sống, đặc biệt với các tình trạng đau lưng mãn tính.</p>
                <h2 class="text-secondary fw-bold mt-4">Lời kết</h2>
                <p>Hãy duy trì luyện tập đều đặn và thực hiện đúng kỹ thuật để đạt hiệu quả cao.</p>
            </div>
            <div class="col-lg-4">
                <h2 class="fw-bold">Bình luận</h2>
                <textarea v-model="newComment" class="form-control mb-2" rows="3" placeholder="Nhập bình luận..."></textarea>
                <button @click="submitComment" class="btn btn-primary w-100">Gửi</button>
                <ul class="list-unstyled mt-3">
                    <li v-for="(comment, index) in comments" :key="index" class="p-2 border-bottom">
                        <strong>{{ comment.username }}:</strong> {{ comment.text }}
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <Footer></Footer>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import Swal from 'sweetalert2';

const route = useRoute();
const postId = route.params.id;
console.log(postId)

//img for news
import news1 from '../assets/images/news_cs_utd.jpg';
import news2 from '../assets/images/news_hlvMU.jpg';
import news3 from '../assets/images/news_france.jpg';

const news = ref([
    {
        id: 1,
        imageNews: news1,
        title: "Chelsea 'mở đàm phán' chiêu mộ mục tiêu của MU",
        content: "Chelsea và Manchester United đang chuẩn bị đối đầu trực tiếp trên thị trường chuyển nhượng, khi cả hai ông lớn của Premier League đều nhắm đến cùng một cầu thủ."
    },
    {
        id: 2,
        imageNews: news2,
        title: "Cập bến MU, HLV Amorim sẵn sàng thanh lý 1 ngôi sao đẳng cấp",
        content: "Ruben Amorim có thể ngay lập tức loại Marcus Rashford khỏi đội hình xuất phát tại Old Trafford khi ông tìm cách triển khai hệ thống 3-4-3."
    },
    {
        id: 3,
        imageNews: news3,
        title: "Chủ tịch LĐBĐ Pháp phá vỡ sự im lặng về Mbappe tại World Cup 2026",
        content: "Chủ tịch LĐBĐ Pháp ông Philippe Diallo đã chính thức lên tiếng về tương lai Kylian Mbappe trên tuyển Pháp cũng như hành trình World Cup 2026."
    },
])

const post = computed(() => {
    if (postId) {
        return news.value.find(moi => moi.id == Number(postId));
    }
    return null;
});


const newComment = ref('');

const comments = ref(JSON.parse(localStorage.getItem(`'comments'-${postId}`)) || []);

const submitComment = () => {
    const username = localStorage.getItem('logUser');
    if (username) {
        comments.value.push({ username, text: newComment.value });
        localStorage.setItem(`'comments'-${postId}`, JSON.stringify(comments.value));
        newComment.value = '';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Thất bại!',
            text: 'Bạn phải đăng nhập để tiếp tục',
            confirmButtonText: 'OK'
        });
        route.push("/login")
    }
};

</script>

<style scoped>
.navbar {
    transition: box-shadow 0.3s ease;
}

.navbar:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.navbar-brand img {
    transition: transform 0.3s ease;
}

.navbar-brand img:hover {
    transform: scale(1.1);
}

.img-fluid {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}

.img-fluid:hover {
    transform: scale(1.05);
}

h1,
h2 {
    color: #0275d8;
    transition: color 0.3s ease;
}

h1:hover,
h2:hover {
    color: #0056b3;
}

textarea {
    border: 2px solid #98e5ff;
    border-radius: 5px;
    transition: border-color 0.3s ease;
}

textarea:focus {
    border-color: #0275d8;
    outline: none;
}

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
    transition: background-color 0.3s, border-color 0.3s;
}

.btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.list-unstyled li {
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 5px;
}

.list-unstyled li:hover {
    background-color: #f8f9fa;
    border-radius: 5px;
}
</style>
