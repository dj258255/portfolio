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
                    
                    // hero-subtitle 색상 특별 처리
                    if (element.classList.contains('hero-subtitle')) {
                        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                        const correctColor = isDark ? '#cbd5e1' : '#64748b';
                        element.style.setProperty('color', correctColor, 'important');
                    }
                    
                    // 특별한 요소들 처리
                    handleSpecialElements(element, true);
                }, delay);
                
            } else {
                // 스크롤 업 시 애니메이션 초기화 (요소가 화면에서 완전히 벗어났을 때)
                if (entry.boundingClientRect.top > 0 || entry.boundingClientRect.bottom < 0) {
                    element.classList.remove('aos-animate');
                    element.style.animationDelay = '0ms';
                    
                    // hero-subtitle 색상 특별 처리
                    if (element.classList.contains('hero-subtitle')) {
                        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                        const correctColor = isDark ? '#cbd5e1' : '#64748b';
                        element.style.setProperty('color', correctColor, 'important');
                    }
                    
                    // 특별한 요소들 초기화
                    handleSpecialElements(element, false);
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 특별한 요소들 처리 함수
    function handleSpecialElements(element, isVisible) {
        // tech-stack 처리 (빠른 순차 애니메이션)
        if (element.classList.contains('tech-stack')) {
            const techItems = element.querySelectorAll('.tech-item');
            if (isVisible) {
                techItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                        item.classList.add('slide-up');
                    }, index * 60); // 빠른 속도
                });
            } else {
                techItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px) scale(0.9)';
                    item.classList.remove('slide-up');
                });
            }
        }
        
        // feature-card 순차 애니메이션 (features-grid에서 제어) - 스크롤 애니메이션만 사용
        if (element.classList.contains('features-grid')) {
            const cards = element.querySelectorAll('.feature-card');
            if (isVisible) {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('aos-animate');
                        card.classList.add('feature-animate');
                    }, index * 200);
                });
            } else {
                cards.forEach(card => {
                    card.classList.remove('aos-animate');
                    card.classList.remove('feature-animate');
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
        
        // hero-title 토스 애니메이션만 (페이드인 없음)
        if (element.classList.contains('hero-title')) {
            if (isVisible) {
                // 토스 애니메이션만 시작 (이미 보이는 상태에서)
                initTossAnimation(element);
            } else {
                // 원본 텍스트로 복원 (회색 상태)
                const originalText = element.dataset.originalText || element.textContent;
                if (!element.dataset.originalText) {
                    element.dataset.originalText = element.textContent;
                }
                element.innerHTML = originalText;
            }
        }
        
        // feature-card 개별 애니메이션 (features-grid에 속하지 않은 경우)
        if (element.classList.contains('feature-card') && !element.closest('.features-grid')) {
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(80px)';
            }
        }
        
        // project-card 개별 애니메이션
        if (element.classList.contains('project-card') && !element.closest('.projects-grid')) {
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(40px) scale(0.95)';
            }
        }
        
        // contact-item 개별 애니메이션
        if (element.classList.contains('contact-item') && !element.closest('.contact-info')) {
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px) scale(0.9)';
            }
        }
        
        // tech-item 개별 애니메이션
        if (element.classList.contains('tech-item')) {
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
            }
        }
        
        // skill-level-guide 애니메이션
        if (element.classList.contains('skill-level-guide')) {
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
            }
        }
        
        // troubleshooting-card 개별 애니메이션
        if (element.classList.contains('troubleshooting-card')) {
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
            }
        }
        
        // troubleshooting-nav 애니메이션
        if (element.classList.contains('troubleshooting-nav')) {
            if (isVisible) {
                const arrows = element.querySelectorAll('.nav-arrow');
                const titleItems = element.querySelectorAll('.title-item');
                
                // 위쪽 화살표
                setTimeout(() => {
                    if (arrows[0]) {
                        arrows[0].style.opacity = '1';
                        arrows[0].style.transform = 'translateY(0)';
                    }
                }, 100);
                
                // 제목들 순차 애니메이션
                titleItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 200 + (index * 100));
                });
                
                // 아래쪽 화살표
                setTimeout(() => {
                    if (arrows[1]) {
                        arrows[1].style.opacity = '1';
                        arrows[1].style.transform = 'translateY(0)';
                    }
                }, 200 + (titleItems.length * 100));
                
            } else {
                const arrows = element.querySelectorAll('.nav-arrow');
                const titleItems = element.querySelectorAll('.title-item');
                
                arrows.forEach(arrow => {
                    arrow.style.opacity = '0';
                    arrow.style.transform = 'translateY(-20px)';
                });
                
                titleItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-30px)';
                });
            }
        }
    }
    
    // 모든 애니메이션 요소들 관찰
    const animatedElements = document.querySelectorAll('[data-aos], .section-header, .features-grid, .projects-grid, .contact-info, .profile-card, .tech-stack, .about-text, .timeline-section, .timeline-item, .hero-subtitle, .hero-title, .feature-card, .project-card, .contact-item, .tech-item, .skill-level-guide, .troubleshooting-card, .troubleshooting-nav');
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
    
    // Hero Title 초기화 (항상 보이도록 설정)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // 항상 보이도록 설정
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        heroTitle.classList.add('aos-animate');
    }
    
    // Hero Subtitle 초기화 (색상 이슈 방지)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        // 다크모드 체크
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const defaultColor = isDark ? '#cbd5e1' : '#64748b';
        
        heroSubtitle.style.setProperty('color', defaultColor, 'important');
        
        // 다크모드 변경 시에도 색상 유지
        const observer = new MutationObserver(() => {
            const currentIsDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const currentColor = currentIsDark ? '#cbd5e1' : '#64748b';
            heroSubtitle.style.setProperty('color', currentColor, 'important');
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

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
        }, 100);
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
            // "범수" 글자는 더 일찍 시작
            const isNameChar = char.classList.contains('name-char');
            const baseDelay = index * 80;
            const actualDelay = isNameChar ? Math.max(0, baseDelay - 200) : baseDelay;
            
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
                }, 200); // 그라데이션 효과 지속 시간
                
            }, actualDelay);
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

    // 사이드 내비게이션 초기화
    initSideNavigation();
});

// 사이드 내비게이션 기능
function initSideNavigation() {
    const sideNav = document.querySelector('.side-nav');
    const sideNavItems = document.querySelectorAll('.side-nav-item');
    const sections = document.querySelectorAll('section');
    
    // 스크롤 시 사이드 내비게이션 표시/숨김 및 활성 섹션 업데이트
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 스크롤이 100px 이상이면 사이드 내비게이션 표시
        if (scrollTop > 100) {
            sideNav.classList.add('visible');
        } else {
            sideNav.classList.remove('visible');
        }
        
        // 현재 보이는 섹션 찾기
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // 활성 내비게이션 아이템 업데이트
        sideNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSection) {
                item.classList.add('active');
            }
        });
        
        lastScrollTop = scrollTop;
    });
    
    // 내비게이션 아이템 클릭 이벤트
    sideNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('href');
            const targetElement = document.querySelector(targetSection);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

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

// 트러블슈팅 섹션 기능
let currentTitleIndex = 0;
let visibleStartIndex = 0;
const visibleItemsCount = 3;
let troubleshootingData = [];

// 트러블슈팅 초기화
function initTroubleshooting() {
    const titleItems = document.querySelectorAll('.title-item');
    const cards = document.querySelectorAll('.troubleshooting-card');
    
    if (titleItems.length === 0 || cards.length === 0) return;
    
    // 데이터 수집
    troubleshootingData = Array.from(titleItems).map((item, index) => ({
        titleElement: item,
        cardElement: cards[index],
        index: index
    }));
    
    // 초기 화면 설정
    updateVisibleTitles();
    showCard(0);
    
    // 제목 클릭 이벤트 추가
    titleItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            selectTitle(index);
        });
    });
}

// 제목 선택
function selectTitle(index) {
    currentTitleIndex = index;
    
    // 선택된 인덱스가 화면에 보이도록 조정
    if (index < visibleStartIndex) {
        visibleStartIndex = index;
    } else if (index >= visibleStartIndex + visibleItemsCount) {
        visibleStartIndex = index - visibleItemsCount + 1;
    }
    
    updateVisibleTitles();
    showCard(index);
}

// 화면에 보이는 제목들 업데이트
function updateVisibleTitles() {
    const titleContainer = document.querySelector('.troubleshooting-titles');
    if (!titleContainer) return;
    
    // 모든 제목 숨기기
    troubleshootingData.forEach(item => {
        item.titleElement.style.display = 'none';
        item.titleElement.classList.remove('active');
    });
    
    // 현재 범위의 제목들만 표시
    const endIndex = Math.min(visibleStartIndex + visibleItemsCount, troubleshootingData.length);
    
    for (let i = visibleStartIndex; i < endIndex; i++) {
        const item = troubleshootingData[i];
        item.titleElement.style.display = 'block';
        
        // 현재 선택된 제목에 active 클래스 추가
        if (i === currentTitleIndex) {
            item.titleElement.classList.add('active');
        }
    }
    
    // 화살표 버튼 상태 업데이트
    updateArrowButtons();
}

// 화살표 버튼 상태 업데이트
function updateArrowButtons() {
    const upArrow = document.querySelector('.nav-up');
    const downArrow = document.querySelector('.nav-down');
    
    if (upArrow && downArrow) {
        // 위 화살표 - 맨 위가 아닐 때만 활성화
        upArrow.style.opacity = visibleStartIndex > 0 ? '1' : '0.3';
        upArrow.style.cursor = visibleStartIndex > 0 ? 'pointer' : 'not-allowed';
        
        // 아래 화살표 - 맨 아래가 아닐 때만 활성화
        const canScrollDown = visibleStartIndex + visibleItemsCount < troubleshootingData.length;
        downArrow.style.opacity = canScrollDown ? '1' : '0.3';
        downArrow.style.cursor = canScrollDown ? 'pointer' : 'not-allowed';
    }
}

// 카드 표시
function showCard(index) {
    const cards = document.querySelectorAll('.troubleshooting-card');
    
    // 모든 카드 숨기기
    cards.forEach(card => {
        card.classList.remove('active');
    });
    
    // 선택된 카드만 표시
    if (cards[index]) {
        cards[index].classList.add('active');
    }
}

// 스크롤 기능
function scrollTitles(direction) {
    if (direction === -1) { // 위로 스크롤
        if (visibleStartIndex > 0) {
            visibleStartIndex--;
            updateVisibleTitles();
        }
    } else if (direction === 1) { // 아래로 스크롤
        if (visibleStartIndex + visibleItemsCount < troubleshootingData.length) {
            visibleStartIndex++;
            updateVisibleTitles();
        }
    }
}

// 전역 함수로 등록 (HTML onclick에서 호출)
window.scrollTitles = scrollTitles;

// 키보드 네비게이션 (트러블슈팅용)
document.addEventListener('keydown', function(e) {
    // 트러블슈팅 섹션이 화면에 보일 때만 키보드 네비게이션 활성화
    const troubleshootingSection = document.getElementById('troubleshooting');
    if (!troubleshootingSection) return;
    
    const rect = troubleshootingSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isVisible) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (currentTitleIndex > 0) {
                selectTitle(currentTitleIndex - 1);
            }
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (currentTitleIndex < troubleshootingData.length - 1) {
                selectTitle(currentTitleIndex + 1);
            }
            e.preventDefault();
            break;
    }
});

// 마우스 휠 이벤트 초기화
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.troubleshooting-sidebar');
    if (sidebar) {
        sidebar.addEventListener('wheel', function(e) {
            e.preventDefault();
            
            if (e.deltaY > 0) {
                // 아래로 스크롤
                scrollTitles(1);
            } else {
                // 위로 스크롤
                scrollTitles(-1);
            }
        });
    }
    
    // 트러블슈팅 초기화
    initTroubleshooting();
});
