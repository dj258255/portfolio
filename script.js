document.addEventListener('DOMContentLoaded', function() {
    // 테마 토글 기능
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // 저장된 테마가 있으면 적용
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // 테마 토글 이벤트
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // 테마 아이콘 업데이트
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
    
    // 전역 스크롤 애니메이션 시스템
    let lastScrollY = window.scrollY;
    let isScrollingDown = true;
    
    // 스크롤 방향 감지
    function detectScrollDirection() {
        const currentScrollY = window.scrollY;
        isScrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;
    }
    
    // 강화된 Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const element = entry.target;
            const animationType = element.dataset.aos || 'fade-up';
            const delay = element.dataset.aosDelay ? parseInt(element.dataset.aosDelay) : 0;
            
            if (entry.isIntersecting) {
                // 스크롤 다운 시 애니메이션 재생
                setTimeout(() => {
                    element.classList.add('aos-animate');
                    element.style.animationDelay = delay + 'ms';
                    
                    // 특별한 요소들 처리
                    handleSpecialElements(element, true);
                }, delay);
                
            } else {
                // 스크롤 업 시 애니메이션 초기화 (요소가 화면에서 완전히 벗어났을 때)
                element.classList.remove('aos-animate');
                element.style.animationDelay = '0ms';
                
                // 특별한 요소들 초기화
                handleSpecialElements(element, false);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // 특별한 요소들 처리 함수
    function handleSpecialElements(element, isVisible) {
        // tech-stack 처리
        if (element.classList.contains('tech-stack')) {
            const techItems = element.querySelectorAll('.tech-item');
            if (isVisible) {
                setTimeout(() => {
                    techItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('slide-up');
                        }, index * 50);
                    });
                }, 100);
            } else {
                techItems.forEach(item => {
                    item.classList.remove('slide-up');
                });
            }
        }
        
        // feature-card 순차 애니메이션
        if (element.classList.contains('features-grid')) {
            const cards = element.querySelectorAll('.feature-card');
            if (isVisible) {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('aos-animate');
                    }, index * 200);
                });
            } else {
                cards.forEach(card => {
                    card.classList.remove('aos-animate');
                });
            }
        }
        
        // project-card 순차 애니메이션
        if (element.classList.contains('projects-grid')) {
            const projects = element.querySelectorAll('.project-card');
            if (isVisible) {
                projects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('aos-animate');
                    }, index * 200);
                });
            } else {
                projects.forEach(project => {
                    project.classList.remove('aos-animate');
                });
            }
        }
        
        // contact-item 순차 애니메이션
        if (element.classList.contains('contact-info')) {
            const contacts = element.querySelectorAll('.contact-item');
            if (isVisible) {
                contacts.forEach((contact, index) => {
                    setTimeout(() => {
                        contact.classList.add('aos-animate');
                    }, index * 150);
                });
            } else {
                contacts.forEach(contact => {
                    contact.classList.remove('aos-animate');
                });
            }
        }
        
        // profile-card 애니메이션
        if (element.classList.contains('profile-card')) {
            const avatar = element.querySelector('.profile-avatar');
            const links = element.querySelectorAll('.profile-link');
            
            if (isVisible) {
                setTimeout(() => {
                    if (avatar) avatar.classList.add('bounce-in');
                    links.forEach((link, index) => {
                        setTimeout(() => {
                            link.classList.add('slide-in');
                        }, index * 100);
                    });
                }, 200);
            } else {
                if (avatar) avatar.classList.remove('bounce-in');
                links.forEach(link => {
                    link.classList.remove('slide-in');
                });
            }
        }
        
        // timeline 섹션 애니메이션
        if (element.classList.contains('timeline-section')) {
            const timelineItems = element.querySelectorAll('.timeline-item');
            if (isVisible) {
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('aos-animate');
                    }, index * 200);
                });
            } else {
                timelineItems.forEach(item => {
                    item.classList.remove('aos-animate');
                });
            }
        }
    }
    
    // 모든 애니메이션 요소들 관찰
    const animatedElements = document.querySelectorAll('[data-aos], .section-header, .features-grid, .projects-grid, .contact-info, .profile-card, .tech-stack, .about-text, .timeline-section, .timeline-item');
    animatedElements.forEach(el => observer.observe(el));
    
    // 추가 애니메이션 처리 함수
    function triggerElementAnimation(element, isVisible) {
        if (isVisible) {
            element.classList.add('aos-animate');
        } else {
            element.classList.remove('aos-animate');
        }
    }
    
    // 네비게이션 스크롤 효과
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 스크롤 방향 감지
        detectScrollDirection();
        
        // 네비게이션을 항상 표시
        navbar.style.transform = 'translateY(0)';
        
        // 스크롤 위치에 따른 스타일 변경
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 섹션 스크롤 함수
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    window.scrollToSection = scrollToSection;
    
    // 연락처 폼 처리
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 간단한 유효성 검사
            if (!name || !email || !message) {
                showNotification('모든 필드를 입력해주세요.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
                return;
            }
            
            // 성공 메시지 표시 (실제로는 서버로 전송)
            showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
            this.reset();
        });
    }
    
    // 이메일 유효성 검사
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 알림 표시 함수
    function showNotification(message, type = 'info') {
        // 기존 알림 제거
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 새 알림 생성
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // 스타일 추가
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // 애니메이션 표시
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 닫기 버튼 이벤트
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // 자동 제거
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Hero Title 토스 스타일 애니메이션
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            initTossAnimation(heroTitle);
        }
    }, 500);

    function initTossAnimation(element) {
        const text = element.textContent;
        let newHTML = '';
        
        // 텍스트를 개별 글자로 분리하면서 "범수" 부분 구분
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            // 공백 처리
            if (char === ' ') {
                newHTML += `<span class="char" data-char=" " style="color: #94a3b8;">&nbsp;</span>`;
            }
            // "범수" 부분 확인
            else if (text.substring(i, i + 2) === '범수') {
                newHTML += `<span class="char name-char" data-char="${char}" style="color: #94a3b8;">${char}</span>`;
                i++; // 다음 글자도 처리
                if (i < text.length) {
                    newHTML += `<span class="char name-char" data-char="${text[i]}" style="color: #94a3b8;">${text[i]}</span>`;
                }
            } else {
                newHTML += `<span class="char" data-char="${char}" style="color: #94a3b8;">${char}</span>`;
            }
        }
        
        element.innerHTML = newHTML;
        
        // 토스 스타일 애니메이션 시작
        setTimeout(() => {
            startTossAnimation(element);
        }, 300);
    }

    function startTossAnimation(element) {
        const chars = element.querySelectorAll('.char');
        
        // 애니메이션 스타일 추가
        if (!document.querySelector('#toss-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'toss-animation-styles';
            style.textContent = `
                .char {
                    position: relative;
                    display: inline-block;
                    transition: color 0.3s ease;
                }
                
                .char.highlight {
                    background: linear-gradient(135deg, #00d464, #03c75a, #10b981);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientShift 0.25s ease-out;
                }
                
                @keyframes gradientShift {
                    0% {
                        background: linear-gradient(135deg, #94a3b8, #94a3b8);
                        background-clip: text;
                        -webkit-background-clip: text;
                    }
                    50% {
                        background: linear-gradient(135deg, #00d464, #03c75a, #10b981);
                        background-clip: text;
                        -webkit-background-clip: text;
                        transform: translateY(-1px);
                    }
                    100% {
                        background: linear-gradient(135deg, #00d464, #03c75a, #10b981);
                        background-clip: text;
                        -webkit-background-clip: text;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        chars.forEach((char, index) => {
            setTimeout(() => {
                // 연두색 조명 효과 시작
                char.classList.add('highlight');
                
                // 그라데이션 효과 후 최종 색상으로 변경
                setTimeout(() => {
                    char.classList.remove('highlight');
                    
                    if (char.classList.contains('name-char')) {
                        char.style.color = '#03c75a'; // 범수는 연두색 유지
                    } else {
                        char.style.color = 'var(--text-primary)'; // 나머지는 검정색
                    }
                }, 250); // 그라데이션 효과 지속 시간 (2배 빠르게)
                
            }, index * 50); // 각 글자마다 50ms 간격 (2배 빠르게)
        });
    }
    
    // 스크롤 진행률 표시
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // 페이지 로드 완료
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// 이미지 모달 기능
let currentImageIndex = 0;
let currentImageArray = [];

function openImageModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    // AWS 이미지들을 배열로 가져오기
    const awsImages = document.querySelectorAll('.aws-image-grid img');
    currentImageArray = Array.from(awsImages);
    currentImageIndex = currentImageArray.indexOf(img);
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    showCurrentImage();
}

function showCurrentImage() {
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    const currentImg = currentImageArray[currentImageIndex];
    
    modalImg.src = currentImg.src;
    caption.textContent = currentImg.alt;
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImageArray.length) % currentImageArray.length;
    showCurrentImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImageArray.length;
    showCurrentImage();
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// 모달 배경 클릭시 닫기
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeImageModal();
    }
});

// 키보드 이벤트 처리
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    if (modal.classList.contains('show')) {
        switch(e.key) {
            case 'Escape':
                closeImageModal();
                break;
            case 'ArrowLeft':
                previousImage();
                e.preventDefault();
                break;
            case 'ArrowRight':
                nextImage();
                e.preventDefault();
                break;
        }
    }
});
