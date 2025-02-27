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
                        <li><router-link to="/changePass" class="dropdown-item">Đổi mật khẩu</router-link></li>
                        <li><button @click="logout" class="dropdown-item">Đăng xuất</button></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav> -->
    <NavBar></NavBar>
    <div class="container my-4">

        <!-- Carousel -->
        <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3"></button>
            </div>
            <div class="carousel-inner">
                <div v-for="(banner, index) in banners" :key="index" :class="['carousel-item', index === 0 ? 'active' : '']">
                    <img :src="banner.imageBanner" class="d-block w-100" style="height: 500px;">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <h2 class="text-center text-dark py-2 rounded-2 w-50 mx-auto mb-4"><strong>Sách thể thao</strong></h2>
        
        <!-- Latest News -->
        <div class="row my-4">
            <div class="col-md-4" v-for="(newsItem, index) in news" :key="index">
                <router-link :to="`/detailNews/${newsItem.id}`" class="text-decoration-none">
                    <div class="card mb-3">
                        <img :src="newsItem.imageNews" class="card-img-top" style="height: 200px;">
                        <div class="card-body">
                            <h5 class="card-title">{{ newsItem.title }}</h5>
                            <p class="card-text">{{ newsItem.content }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- Tabs for Matches and Results -->
        <div class="row">
            <div class="col-md-7">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="lichthidau-tab" data-bs-toggle="tab" href="#lichthidau" role="tab">Lịch thi đấu bóng đá</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="ketqua-tab" data-bs-toggle="tab" href="#ketqua" role="tab">Kết quả bóng đá</a>
                    </li>
                </ul>
                <div class="tab-content mt-3">
                    <div class="tab-pane fade show active" id="lichthidau" role="tabpanel">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Thời gian</th>
                                    <th>Cặp đấu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(match, index) in lichthidau" :key="index">
                                    <td>{{ match.ngay }}</td>
                                    <td>{{ match.thoigian }}</td>
                                    <td>{{ match.capdau }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="ketqua" role="tabpanel">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Trạng thái</th>
                                    <th>Kết quả</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(result, index) in ketqua" :key="index">
                                    <td>{{ result.ngay }}</td>
                                    <td>{{ result.trangthai }}</td>
                                    <td>{{ result.ketqua }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Standings Table -->
            <div class="col-md-5" style="height: 550px; overflow-y: auto;">
                <h3 class="text-center text-white bg-danger py-2 rounded-3">Bảng xếp hạng</h3>
                <table class="table table-bordered table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>Hạng</th>
                            <th>Tên đội bóng</th>
                            <th>Tr</th>
                            <th>T</th>
                            <th>H</th>
                            <th>B</th>
                            <th>BT</th>
                            <th>BB</th>
                            <th>HS</th>
                            <th>Đ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="team in teams" :key="team.rank">
                            <td>{{ team.rank }}</td>
                            <td>{{ team.name }}</td>
                            <td>{{ team.played }}</td>
                            <td>{{ team.win }}</td>
                            <td>{{ team.draw }}</td>
                            <td>{{ team.lose }}</td>
                            <td>{{ team.goalsFor }}</td>
                            <td>{{ team.goalsAgainst }}</td>
                            <td>{{ team.goalDiff }}</td>
                            <td>{{ team.points }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row my-5">
            <h2 class="text-center text-dark py-2 rounded-2 w-50 mx-auto mb-4"><strong>Tin đăng gần đây</strong></h2>
            <div class="row border-bottom pb-3 mb-3" v-for="(total, index) in totals" :key="index">
                <div class="col-md-3">
                    <img :src="total.imgageTotal" alt="Ảnh" class="img-fluid" style="height: 195px;width: 375px;">
                </div>
                <div class="col-md-9">
                    <h5><strong>{{ total.title }}</strong></h5>
                    <p>{{ total.content }}</p>
                </div>
            </div>
        </div>
    </div>

    
        <!-- Footer -->
        <Footer></Footer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";

let totals = JSON.parse(localStorage.getItem('totals')) || [];
onMounted(() => {
    totals = totals.value;
});

//img for carosel
import banner1 from '../assets/images/carousel_football.webp';
import banner2 from '../assets/images/carousel_real.jpg';
import banner3 from '../assets/images/carousel_svd.webp';
import banner4 from '../assets/images/carousel_vn.jpg';
//img for news
import news1 from '../assets/images/news_cs_utd.jpg';
import news2 from '../assets/images/news_hlvMU.jpg';
import news3 from '../assets/images/news_france.jpg';



const banners = ref([
    {
        imageBanner: banner1
    },
    {
        imageBanner: banner2
    },
    {
        imageBanner: banner3
    },
    {
        imageBanner: banner4
    }
])

const news = ref([
    {
        id: 1,
        imageNews: news1,
        title: "Chelsea 'mở đàm phán' chiêu mộ mục tiêu của MU",
        content: "Chelsea và Manchester United đang chuẩn bị đối đầu trực tiếp trên thị trường chuyển nhượng, khi cả hai ông lớn của Premier League đều nhắm ."
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

//tab lịch thi đấu
const lichthidau = ref([
    { ngay: "14/11", thoigian: "18:00", capdau: "Bình Định VS Hải Phòng" },
    { ngay: "14/11", thoigian: "19:15", capdau: "Hà Nội FC VS Bình Dương" },
    { ngay: "14/11", thoigian: "18:00", capdau: "Bình Định VS Hải Phòng" },
    { ngay: "14/11", thoigian: "19:15", capdau: "Hà Nội FC VS Bình Dương" },
]);

//tab Kết quả bóng đá
const ketqua = ref([
    { ngay: "09/11/2024", trangthai: "FT (Full Time)", ketqua: "Nghệ An 3-3 Hà Tĩnh" },
    { ngay: "09/11/2024", trangthai: "FT (Full Time)", ketqua: "Nghệ An 3-3 Hà Tĩnh" },
    { ngay: "09/11/2024", trangthai: "FT (Full Time)", ketqua: "Nghệ An 3-3 Hà Tĩnh" },
]);

//bảng xếp hàng
const teams = ref([
    { rank: 1, name: "Thanh Hóa", played: 7, win: 4, draw: 2, lose: 1, goalsFor: 12, goalsAgainst: 6, goalDiff: 6, points: 14 },
    { rank: 2, name: "Nam Định", played: 7, win: 4, draw: 1, lose: 2, goalsFor: 10, goalsAgainst: 6, goalDiff: 4, points: 13 },
    { rank: 3, name: "HAGL", played: 7, win: 3, draw: 3, lose: 1, goalsFor: 10, goalsAgainst: 6, goalDiff: 4, points: 12 },
    { rank: 4, name: "Viettel", played: 7, win: 3, draw: 3, lose: 1, goalsFor: 7, goalsAgainst: 5, goalDiff: 2, points: 12 },
    { rank: 5, name: "Bình Dương", played: 7, win: 3, draw: 2, lose: 2, goalsFor: 11, goalsAgainst: 6, goalDiff: 5, points: 11 },
    { rank: 6, name: "Công An Hà Nội", played: 7, win: 3, draw: 2, lose: 2, goalsFor: 9, goalsAgainst: 4, goalDiff: 5, points: 11 },
    { rank: 7, name: "Hà Tĩnh", played: 7, win: 2, draw: 5, lose: 0, goalsFor: 7, goalsAgainst: 4, goalDiff: 3, points: 11 },
    { rank: 8, name: "Hà Nội FC", played: 7, win: 2, draw: 4, lose: 1, goalsFor: 9, goalsAgainst: 7, goalDiff: 2, points: 10 },
    { rank: 9, name: "Bình Định", played: 7, win: 2, draw: 2, lose: 3, goalsFor: 6, goalsAgainst: 9, goalDiff: -3, points: 8 },
    { rank: 10, name: "Quảng Nam", played: 7, win: 1, draw: 3, lose: 3, goalsFor: 3, goalsAgainst: 8, goalDiff: -5, points: 6 },
    { rank: 11, name: "Hồ Chí Minh", played: 7, win: 1, draw: 3, lose: 3, goalsFor: 2, goalsAgainst: 9, goalDiff: -7, points: 6 },
    { rank: 12, name: "Hải Phòng", played: 7, win: 0, draw: 4, lose: 3, goalsFor: 8, goalsAgainst: 12, goalDiff: -4, points: 4 },
    { rank: 13, name: "Đà Nẵng", played: 7, win: 0, draw: 4, lose: 3, goalsFor: 5, goalsAgainst: 11, goalDiff: -6, points: 4 },
    { rank: 14, name: "Sông Lam Nghệ An", played: 7, win: 0, draw: 4, lose: 3, goalsFor: 4, goalsAgainst: 10, goalDiff: -6, points: 4 },
]);

</script>

<style scoped>
.btn-secondary {
    transition: background-color 0.3s;
}

.btn-secondary:hover {
    background-color: #4b4b4b;
}

.form-control:focus {
    border-color: #0056b3;
    box-shadow: 0 0 5px #0056b3;
}

.card {
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-title:hover {
    color: #007bff;
}

.carousel-inner img {
    transition: transform 0.3s;
}

.carousel-inner img:hover {
    transform: scale(1.05);
}
</style>
