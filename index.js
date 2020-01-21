// Hàm ajax chạy bất đồng bộ, do đó giá trị xxxImage là undefined
let xxxImage = ajax.get("gaixinh.info");
console.log(xxxImage);

// Truyền callback vào hàm ajax
function callback(image) {
    console.log(image);
}
ajax.get("gaixinh.info", callback);

// Có thể viết gọn như sau
ajax.get("gaixinh.info", function(image){
    console.log(image);
});

// Do những hàm dưới đây chạy BẤT ĐỒNG BỘ, bạn không thể lấy dữ liệu lần lượt kiểu này
let xe = xin_me_mua_xe(); // Chờ cả năm mới có xe
let gai = cho_gai_di_choi(xe); // Lấy xe chở gái đi chơi
let abcd = cho_gai_vao_hotel(y); // Đi chơi xong chở gái đi đâu đó

// Mà phải sử dụng đống callback gớm ghiếc, tạo thành callback hell
xin_me_mua_xe(function(xe){
    cho_gai_di_choi(xe, function(gai){
        cho_gai_vao_hotel(hotel, function(z){
            // Làm gì đó, ai biết
        });
    });
});

// ĐỂ GIẢI QUYẾT CALLBACK HELL, CÁC BÁC DEV ĐÃ SÁNG TẠO RA PROMISE
// Promise: Lời hứa.
// Một lời hứa có 3 trạng thái sau:
// - pending: Hiện lời hứa chỉ là lời hứa suông, còn đang chờ người khác thực hiện
// - fulfilled: Lời hứa đã được thực hiện
// - reject: Bạn đã bị thất hứa, hay còn gọi là bị "xù"

// Ví dụ:
// Hàm này trả ra lời hứa chứ không phải chiếc BMW
function hua_cho_co() {
    return Promise((thuc_hien_loi_hua, that_hua) => {
        // Sau 1 thời gian dài dài dài
        // Nếu vui bố mẹ sẽ thực hiện lời hứa
        if (vui) {
            thuc_hien_loi_hua("Xe BMW");
        }
        else {
            that_hua("Xe dap");
        }
    });
}

// Lời hứa bây giờ đang là PENDING
// Nếu được thực hiện, bạn sẽ có "Xe BMW"
// Nếu bị reject, bạn sẽ có "Xe đạp"
let promise = hua_cho_co();
promise
    .then((xe_bmw) => { // Khi lời hứa được thực hiện, promise sẽ gọi callback trong hàm then
        console.log("Được chiếc BMW vui quá");
    }).catch((xe_dap) => { // Khi bị thất hứa, promise sẽ gọi callback trong hàm catch
        console.log("Được chiếc xe đạp ...");
    });


function get(url) {
    return new Promise((resolve, reject) => {
        // Lấy hình từ gaixinh.info
        // Nếu bị lỗi thì đành thất hứa
        if (error) reject("Error");

        // Nếu lấy được thì thực hiện lời hứa
        resolve(xxxImage);
    });
}

let promise = ajax.get("gaixinh.info");
promise.then(image => fap).catch(error => alert(error));

// Điểm hay của promise so với callback
// 1. PROMISE CHAINING
// Dùng callback hell
xin_me_mua_xe(function (xe) {  
    cho_gai_di_choi(xe, function (gai) {
        cho_gai_vao_hotel(hotel, function (z) {
            // Làm gì đó, ai biết
          });
      });
});

// Dùng promise, code gọn nhẹ dễ đọc
xin_me_mua_xe.then(cho_gai_di_choi).then(cho_gai_vao_hotel).then(function () { /* Làm gì đó ai biết */  });


// 2. BẮT LỖI DỄ DÀNG HƠN
// Khi một function bị lỗi, promise sẽ bị reject (thất hứa)
function cho_gai_vao_hotel() {
    return Promise((resolve, reject) => {
        reject("Xin lỗi hôm nay em đèn đỏ");
    });
}

xin_me_mua_xe
    .then(cho_gai_di_choi)
    .then(cho_gai_vao_hotel)
    .catch(function () { /* Làm gì đó, ai biết */  })
    .catch(function (error) {
      console.log(err); // "Xin lỗi hôm nay em đèn đỏ"
      console.log("Xui vl");
    });

// 3. XỬ LÝ BẤT ĐỒNG BỘ
// Ba hàm này phải được thực hiện "cùng lúc" chứ không phải "lần lượt"
let so_tren = new Promise((resolve, reject) => {
    resolve("Phe tren");
});

let so_duoi = new Promise((resolve, reject) => {
    resolve("Phe duoi");
});

let so_tum_lum = new Promise((resolve, reject) => {
    resolve("Phe tum lum");
});

// Truyền 1 array chứa toàn bộ promise vào hàm Promise.all
// Hàm này trả ra 1 promise, tổng hợp kết quả của các promise đưa vào
Promise.all([so_tren, so_duoi, so_tum_lum])
    .then(function(result) {
        console.log(result); // ["Phe tren", "Phe duoi", "Phe tum lum"]
        // Phe xong làm gì ai biết
    });