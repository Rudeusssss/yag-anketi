document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ahpForm');
    const loader = document.getElementById('loader');
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMessage');

    // Sayfa Yükleme Tamamlandığında Loader'ı Kaldır
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 300);
    });

    // Form Gönderim İşlemi
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Butonu Devre Dışı Bırak
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'İletiliyor...';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Formu Sakla ve Başarı Mesajını Göster
                form.style.opacity = '0';
                setTimeout(() => {
                    form.style.display = 'none';
                    successMsg.style.display = 'block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 300);
            } else {
                throw new Error();
            }
        } catch (error) {
            alert('Gönderim sırasında bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Anketi Tamamla ve Gönder';
        }
    });
});
