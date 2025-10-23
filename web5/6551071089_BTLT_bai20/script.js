$(document).ready(function() {
    // Các biến cần thiết
    const slideContainer = $('.slideshow-slide');
    const images = slideContainer.find('img');
    const imageCount = images.length;
    
    // Lấy chiều rộng của 1 ảnh (bao gồm cả margin)
    const imageWidth = images.outerWidth(true); 
    
    let currentIndex = 0;
    let autoSlideInterval;

    // Hàm di chuyển slide
    function moveToSlide(index) {
        // Giới hạn index trong khoảng từ 0 đến (tổng số ảnh - số ảnh hiển thị)
        if (index > imageCount - 5) {
            index = 0; // Quay về ảnh đầu tiên nếu đi hết
        }
        if (index < 0) {
            index = imageCount - 5; // Về ảnh cuối nếu lùi từ ảnh đầu
        }
        
        // Dùng transform để di chuyển thanh trượt
        slideContainer.css('transform', `translateX(-${index * imageWidth}px)`);
        currentIndex = index;
    }

    // Xử lý sự kiện click nút "Next"
    $('.next').click(function() {
        moveToSlide(currentIndex + 1);
    });

    // Xử lý sự kiện click nút "Prev"
    $('.prev').click(function() {
        moveToSlide(currentIndex - 1);
    });

    // Hàm tự động trượt
    function startAutoSlide() {
        autoSlideInterval = setInterval(function() {
            $('.next').click(); // Giả lập hành động click nút "next"
        }, 3000); // Thay đổi 3000 (3 giây) để điều chỉnh tốc độ trượt
    }

    // Hàm dừng tự động trượt
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Bắt đầu tự động trượt khi trang được tải
    startAutoSlide();

    // Dừng trượt khi người dùng di chuột vào slideshow
    $('.slideshow-container').mouseenter(function() {
        stopAutoSlide();
    });

    // Tiếp tục trượt khi người dùng di chuột ra ngoài
    $('.slideshow-container').mouseleave(function() {
        startAutoSlide();
    });
});