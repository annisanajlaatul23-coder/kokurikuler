// Memastikan semua elemen HTML dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Fungsi Smooth Scrolling untuk Navigasi
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            // Mencegah perilaku default link (lompatan langsung)
            e.preventDefault(); 
            
            // Mengambil ID target (misalnya, dari href="#sinopsis")
            const targetId = this.getAttribute('href');
            
            // Mendapatkan elemen target
            const targetElement = document.querySelector(targetId);

            // Melakukan guliran halus ke elemen target
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------------------------------------------------------
    
    // 2. Fungsi Menandai Tautan Navigasi yang Aktif (Active Link Highlighting)
    
    // Mengambil semua elemen bagian (section) yang memiliki ID untuk navigasi
    const sections = document.querySelectorAll('section[id]');
    
    // Fungsi yang akan dijalankan saat halaman digulir
    window.addEventListener('scroll', () => {
        
        let current = ''; // Variabel untuk menyimpan ID bagian yang sedang aktif

        // Iterasi melalui setiap bagian
        sections.forEach(section => {
            // Mendapatkan posisi gulir (scroll position) dari bagian atas jendela
            const sectionTop = section.offsetTop;
            
            // Mengambil tinggi (height) bagian
            const sectionHeight = section.clientHeight;

            // Logika: Jika posisi gulir berada di dalam area bagian saat ini
            // Dikurangi 150px agar penanda aktif terjadi sebelum bagian mencapai puncak penuh
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        // Menghapus kelas 'active' dari semua tautan navigasi
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Menambahkan kelas 'active' pada tautan yang sesuai dengan ID bagian saat ini
        const activeLink = document.querySelector('nav ul li a[href="#' + current + '"]');
        if (activeLink) {
            activeLink.classList.add('active');
        }
    });

}); // Akhir DOMContentLoaded

// ---------------------------------------------------------

/* CATATAN PENTING: 
   Untuk melihat efek 'active link highlighting', 
   Anda harus menambahkan styling di file style.css Anda, misalnya:
   
   nav ul li a.active {
       color: var(--warna-aksen); 
       font-weight: bold;
       border-bottom: 2px solid var(--warna-aksen);
   } 
*/