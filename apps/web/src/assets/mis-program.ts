import coverImg from '@/assets/mis.webp';
export const mis = {
  title: 'HỆ THỐNG THÔNG TIN QUẢN LÝ (MANAGEMENT OF INFORMATION SYSTEMS)',
  image: coverImg,
  brief: `"Hệ thống thông tin quản lý (HTTTQL) là hệ thống có chức năng thu thập, xử lý, lưu 
trữ và phân phối thông tin cần thiết cho các đối tượng sử dụng trong bộ máy quản lý để hỗ
trợ ra quyết định, phối hợp hoạt động và điều khiển các tiến trình trong tổ chức."`,
  credit: 3,
  periods: 45,
  lessons: 12,
  chapters: 7,
  tests: 2,
  intro1: `Học phần Hệ thống thông tin quản lý cung cấp cho sinh viên những kiến thức cơ bản 
về những hệ thống thông tin khác nhau, cũng như phân tích và thiết kế hệ thống, tìm hiểu các 
giai đoạn của hệ thống thông tin và một số hệ thống cần thiết cho doanh nghiệp.`,
  intro2: `Làm nền tảng và cơ sở giúp sinh viên chọn được hệ thống thông tin thích hợp cho doanh 
nghiệp cụ thể và triển khai được tiến trình nào doanh nghiệp cần thực hiện.`,
  intro3: `Môn học HTTTQL có nội dung bao gồm trong 07 chương được được hướng dẫn với thời lượng 
11 buổi học tương đương 45 tiết, trong đó gồm 30 tiết học và 15 tiết thảo luận/bài tập.`,
  intro4: `Cung cấp các kiến thức cơ bản của HTTTQL, quy trình xây dựng, thu thập, xử lý, tổ chức
dữ liệu, áp dung HTTTQL vào doanh nghiệp trong quá trình hoạch định chiến lược dựa trên HTTTQL, 
tổ chức, giám sát, cập nhật và nâng cấp HTTT.`,
  hardskill: `Sinh viên rèn luyện phương pháp tự nghiên cứu, đặt vấn để, mô hình hóa vấn đề và 
  giải quyết vấn để.`,
  softskill: `Sinh viên rèn luyện kỹ năng học nhóm, thảo luận, phân công để đạt được mục tiêu.`,
  lesson_contents: [
    {
      'Chương 1': [
        `Khái niệm HTTTQL`,
        `Tổng quan các thành phần của một HTTTQL`,
        `Các loại thông tin trong doanh nghiệp`,
        `Vai trò của HTTTQL trong doanh nghiệp`,
      ],
    },
    {
      'Chương 2': [
        `Các thành phần của HTTTQL`,
        `Lựa chọn hệ thống phù hợp với mô hình kinh doanh`,
      ],
    },
    {
      'Chương 3': [
        `Hệ quản trị CSDL quan hệ (Relational Database Management System - RDBMS)`,
        `Thiết kế - Tổ chức và quản lý CSDL`,
      ],
    },
    {
      'Chương 4': [
        `Xây dựng và phát triển HTTTQL`,
        `Quản lý hệ thống MIS và các thách thức`,
      ],
    },
    {
      'Chương 5': [
        `Các HTTTQL chức năng: Nhân sự, Kế toán tài chính, Bán hàng`,
        `Các hệ thống cung cấp tri thức`,
        `Các hệ thống hỗ trợ điều hành`,
      ],
    },
    {
      'Chương 6': [
        `HTTTQL quan hệ khách hàng (Customer Relationship Information Management System)`,
        `HTTTQL quản lý chuỗi cung ứng (Supply-Chain Information Management System)`,
        `HTTTQL hoạch định nguồn lực doanh nghiệp (Enterprise Resource Planning Information Management System)`,
        `HTTT quản lý tri thức (Knowledge Information Management System)`,
      ],
    },
    {
      'Chương 7': [
        `Môi trường kinh doanh toàn cầu`,
        `HTTTQL trong môi trường kinh doanh toàn cầu`,
      ],
    },
  ],
  test_intro1: `Phần bài tập của học phần nhằm giúp sinh viên phân tích được mô hình kinh doanh của
  doanh nghiệp, chuyển mô hình kinh doanh thành mô hình cơ sở dữ liệu, làm nền tảng cho sự phân tích 
  và tổng hợp thông tin có giá trị và kịp thời cung cấp cho doanh nghiệp.`,
  test_intro2: `Nội dung bài tập được chia làm 02 phần: Bài tập số 1 và Bài tập số 2. Trong đó bài 
  tập số 1 sẽ làm cơ sở để thực hiện bài tập số 2.`,
  test_contents: [
    {
      title: 'Bài tập số 1',
      purpose:
        'Nghiên cứu mô hình kinh doanh và áp dụng mô hình cơ sở dữ liệu phù hợp.',
      required: 'Nắm vững mô hình kinh doanh và mô hình cơ sở dữ liệu',
      result:
        'Mô hình cơ sở dữ liệu quan hệ (Relational Database Model) cho doanh nghiệp.',
      submit_form: 'nộp file báo cáo dưới dạng pdf.',
      formation: 'theo nhóm.',
      duration: '2 tuần.',
      score: '10 điểm, 40%.',
    },
    {
      title: 'Bài tập số 2',
      purpose:
        'Truy xuất và tổng hợp thông tin từ cơ sở dữ liệu đã xây dựng ở Bài tập số 1.',
      required: 'Nắm vững mô hình cơ sở dữ liệu đã thực hiện ở Bài tập số 1.',
      result: 'Thông tin được truy xuất từ cơ sở dữ liệu.',
      submit_form:
        'Thuyết trình + nộp file báo cáo dưới dạng pdf, file cơ sở dữ liệu dưới dạng sql.',
      formation: 'theo nhóm.',
      duration: '4 tuần.',
      score: '10 điểm, 40%.',
    },
  ],
  docs: [
    `Bài giảng Hệ thống thông tin quản lý (2019) - Lê Thị Ngọc Diệp`,
    `Slide bài giảng Hệ thống thông tin quản lý - Nguyễn Việt Tiên`,
  ],
  refs: [
    `Management Information Systems Managing The Digital Firm (17th Edition - 2019) - 
    Kenneth C. Laudon - Jane P. Laudon`,
  ],
};
