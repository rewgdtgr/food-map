/**
 * 班级美食地图 - 交互逻辑
 * 角色：前端开发工程师
 * 功能：筛选/搜索/排序、模态框、localStorage点赞收藏、滚动动效、Lightbox
 */

// ========== 美食数据 ==========
// 图片说明：使用 emoji 图标 + 渐变色背景作为美食占位图
// data-ai-placeholder 标记处可替换为真实美食照片或 AI 生成图片
const FOOD_DATA = [
    {
        id: 1,
        name: '老张煎饼果子',
        category: 'snack',
        categoryName: '小吃',
        description: '校门口开了十年的老字号，薄脆香酥，加个鸡蛋和火腿肠，早餐完美选择！老板手法娴熟，面糊摊得又薄又匀，配上秘制酱料，每一口都是满满的幸福感。',
        location: '学校南门对面',
        priceMin: 6,
        priceMax: 12,
        rating: 5,
        badge: '人气TOP1',
        emoji: '🥞',
        gradient: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)',
        // data-ai-placeholder: 待替换为AI生成美食图片 - 煎饼果子实拍或AI生成图
        image: ''
    },
    {
        id: 2,
        name: '小李麻辣烫',
        category: 'meal',
        categoryName: '正餐',
        description: '自选食材，汤底浓郁，辣度可选。放学后来一碗，暖胃又暖心，性价比超高！新鲜蔬菜、豆制品、肉类应有尽有，骨汤熬制8小时，味道醇厚。',
        location: '东门步行街',
        priceMin: 15,
        priceMax: 25,
        rating: 5,
        badge: '同学最爱',
        emoji: '🍜',
        gradient: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A24 100%)',
        // data-ai-placeholder: 待替换为AI生成美食图片 - 麻辣烫实拍或AI生成图
        image: ''
    },
    {
        id: 3,
        name: '鲜果时光',
        category: 'drink',
        categoryName: '饮品',
        description: '新鲜水果现榨果汁，芒果冰沙和草莓奶昔是招牌，夏天必备解暑神器！所有水果当日采购，绝不使用果酱和添加剂，健康又美味。',
        location: '西门奶茶街',
        priceMin: 8,
        priceMax: 15,
        rating: 4,
        badge: null,
        emoji: '🧃',
        gradient: 'linear-gradient(135deg, #96E6A1 0%, #DDF47C 100%)',
        // data-ai-placeholder: 待替换为AI生成美食图片 - 果汁饮品实拍或AI生成图
        image: ''
    },
    {
        id: 4,
        name: '台湾香酥鸡排',
        category: 'snack',
        categoryName: '小吃',
        description: '超大块鸡排，外酥里嫩，撒上孜然和辣椒粉，放学路上的能量补给站！选用优质鸡腿肉，秘制腌料浸泡24小时，炸出来金黄酥脆。',
        location: '北门小吃街',
        priceMin: 10,
        priceMax: 18,
        rating: 5,
        badge: null,
        emoji: '🍗',
        gradient: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
        // data-ai-placeholder: 待替换为AI生成美食图片 - 炸鸡排实拍或AI生成图
        image: ''
    },
    {
        id: 5,
        name: '甜蜜烘焙坊',
        category: 'dessert',
        categoryName: '甜品',
        description: '手工蛋糕和面包，蛋挞和泡芙是必买款。生日蛋糕也可以提前预定哦！每日新鲜出炉，使用进口黄油和动物奶油，口感细腻。',
        location: '南门商业街',
        priceMin: 5,
        priceMax: 35,
        rating: 4,
        badge: '新品推荐',
        emoji: '🧁',
        gradient: 'linear-gradient(135deg, #FFD1FF 0%, #FAB1D0 100%)',
        // data-ai-placeholder: 待替换为AI生成美食图片 - 蛋糕甜品实拍或AI生成图
        image: ''
    },
    {
        id: 6,
        name: '重庆小面馆',
        category: 'meal',
        categoryName: '正餐',
        description: '正宗重庆风味，豌杂面和酸辣粉是一绝，辣得过瘾，麻得舒服！师傅是重庆人，手艺地道，花椒和辣椒都是老家运来的。',
        location: '东门美食广场',
        priceMin: 12,
        priceMax: 20,
        rating: 5,
        badge: null,
        emoji: '🌶️',
        gradient: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
        // data-ai-placeholder: 待替换为AI生成美食图片 - 重庆小面实拍或AI生成图
        image: ''
    },
    {
        id: 7,
        name: '茶语时光',
        category: 'drink',
        categoryName: '饮品',
        description: '珍珠奶茶、水果茶、奶盖茶，种类超多。波霸珍珠Q弹有嚼劲，同学们的最爱！茶叶选用高山乌龙，奶盖每日现打，口感绵密。',
        location: '西门奶茶街',
        priceMin: 10,
        priceMax: 18,
        rating: 4,
        badge: null,
        emoji: '🧋',
        gradient: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)',
        // data-ai-placeholder: 待替换为AI生成美食图片 - 珍珠奶茶实拍或AI生成图
        image: ''
    },
    {
        id: 8,
        name: '冰雪奇缘冰淇淋',
        category: 'dessert',
        categoryName: '甜品',
        description: '手工冰淇淋，口味超多：抹茶、巧克力、草莓、芒果...夏天来一个，瞬间清凉！采用意大利gelato工艺，口感丝滑浓郁。',
        location: '学校正门右侧',
        priceMin: 5,
        priceMax: 15,
        rating: 5,
        badge: null,
        emoji: '🍦',
        gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        // data-ai-placeholder: 待替换为AI生成美食图片 - 冰淇淋实拍或AI生成图
        image: ''
    }
];

// ========== localStorage模块（独立封装） ==========
const Storage = {
    /**
     * 读取localStorage数据
     * @param {string} key - 存储键名
     * @param {*} defaultValue - 默认值
     * @returns {*} 解析后的数据或默认值
     */
    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error(`读取localStorage失败: ${key}`, e);
            return defaultValue;
        }
    },

    /**
     * 写入localStorage数据
     * @param {string} key - 存储键名
     * @param {*} value - 要存储的数据
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`写入localStorage失败: ${key}`, e);
        }
    }
};

// ========== 点赞/收藏数据管理 ==========
const InteractionData = {
    /**
     * 获取所有点赞数据
     * @returns {Object} { foodId: count }
     */
    getLikes() {
        return Storage.get('food_likes', {});
    },

    /**
     * 点赞
     * @param {number} foodId - 美食ID
     * @returns {number} 新的点赞数
     */
    like(foodId) {
        const likes = this.getLikes();
        likes[foodId] = (likes[foodId] || 0) + 1;
        Storage.set('food_likes', likes);
        return likes[foodId];
    },

    /**
     * 获取收藏列表
     * @returns {number[]} 已收藏的美食ID数组
     */
    getFavorites() {
        return Storage.get('food_favorites', []);
    },

    /**
     * 切换收藏状态
     * @param {number} foodId - 美食ID
     * @returns {boolean} 是否已收藏
     */
    toggleFavorite(foodId) {
        const favorites = this.getFavorites();
        const index = favorites.indexOf(foodId);
        if (index === -1) {
            favorites.push(foodId);
        } else {
            favorites.splice(index, 1);
        }
        Storage.set('food_favorites', favorites);
        return index === -1;
    },

    /**
     * 检查是否已收藏
     * @param {number} foodId - 美食ID
     * @returns {boolean}
     */
    isFavorited(foodId) {
        return this.getFavorites().includes(foodId);
    },

    /**
     * 获取评论数据
     * @returns {Object} { foodId: [{ nickname, content, time }] }
     */
    getComments() {
        return Storage.get('food_comments', {});
    },

    /**
     * 添加评论
     * @param {number} foodId - 美食ID
     * @param {string} nickname - 昵称
     * @param {string} content - 评论内容
     * @returns {Object} 新评论对象
     */
    addComment(foodId, nickname, content) {
        const comments = this.getComments();
        if (!comments[foodId]) {
            comments[foodId] = [];
        }
        const newComment = {
            nickname: nickname || '匿名用户',
            content,
            time: new Date().toISOString()
        };
        comments[foodId].unshift(newComment);
        Storage.set('food_comments', comments);
        return newComment;
    },

    /**
     * 获取某美食的评论列表
     * @param {number} foodId - 美食ID
     * @returns {Array} 评论数组
     */
    getFoodComments(foodId) {
        return this.getComments()[foodId] || [];
    }
};

// ========== 状态管理 ==========
const state = {
    currentFilter: 'all',
    currentSearch: '',
    currentSort: 'default',
    currentFoodId: null,
    lightboxIndex: 0,
    filteredData: [...FOOD_DATA]
};

// ========== DOM元素引用 ==========
const elements = {
    foodGrid: document.getElementById('foodGrid'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    searchStatus: document.getElementById('searchStatus'),
    noResults: document.getElementById('noResults'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    sortSelect: document.getElementById('sortSelect'),
    modal: document.getElementById('modal'),
    lightbox: document.getElementById('lightbox'),
    toast: document.getElementById('toast')
};

// ========== 渲染模块 ==========
const Renderer = {
    /**
     * 生成星星HTML
     * @param {number} rating - 评分（1-5）
     * @returns {string} 星星HTML
     */
    renderStars(rating) {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            html += `<span class="star${i > rating ? ' empty' : ''}">★</span>`;
        }
        return html;
    },

    /**
     * 渲染单个美食卡片
     * @param {Object} food - 美食数据
     * @returns {string} 卡片HTML
     */
    renderCard(food) {
        const likes = InteractionData.getLikes()[food.id] || 0;
        const isFavorited = InteractionData.isFavorited(food.id);
        
        // 使用 emoji + 渐变背景作为美食占位图（待替换为真实图片时可改回 img 标签）
        const imageHtml = food.image 
            ? `<img src="${food.image}" alt="${food.name}" class="card-image" loading="lazy" data-ai-placeholder="待替换为AI生成美食图片">`
            : `<div class="card-emoji-placeholder" style="background: ${food.gradient};" data-ai-placeholder="待替换为AI生成美食图片"><span class="emoji-icon">${food.emoji}</span></div>`;
        
        return `
            <article class="food-card fade-in-up" data-id="${food.id}" data-category="${food.category}">
                ${food.badge ? `<span class="card-badge">${food.badge}</span>` : ''}
                <div class="card-image-wrapper">
                    ${imageHtml}
                </div>
                <div class="card-content">
                    <div class="card-category">${food.categoryName}</div>
                    <h3 class="card-title">${food.name}</h3>
                    <p class="card-description">${food.description}</p>
                    <div class="location-tag">📍 ${food.location}</div>
                    <div class="card-meta">
                        <span class="card-price">¥${food.priceMin}-${food.priceMax}</span>
                        <div class="card-rating">${this.renderStars(food.rating)}</div>
                    </div>
                    <div class="card-actions">
                        <button class="card-action-btn like-btn ${likes > 0 ? 'liked' : ''}" data-id="${food.id}">
                            👍 <span class="like-count">${likes}</span>
                        </button>
                        <button class="card-action-btn favorite-btn ${isFavorited ? 'favorited' : ''}" data-id="${food.id}">
                            ⭐ ${isFavorited ? '已收藏' : '收藏'}
                        </button>
                    </div>
                </div>
            </article>
        `;
    },

    /**
     * 渲染美食网格
     */
    renderGrid() {
        const html = state.filteredData.map(food => this.renderCard(food)).join('');
        elements.foodGrid.innerHTML = html;
        
        // 显示/隐藏无结果提示
        elements.noResults.classList.toggle('hidden', state.filteredData.length > 0);
        
        // 触发滚动动效
        ScrollEffect.observe();
    }
};

// ========== 筛选/搜索/排序模块 ==========
const Filter = {
    /**
     * 应用筛选条件
     */
    apply() {
        let data = [...FOOD_DATA];

        // 分类筛选
        if (state.currentFilter !== 'all') {
            data = data.filter(food => food.category === state.currentFilter);
        }

        // 关键词搜索
        if (state.currentSearch) {
            const keyword = state.currentSearch.toLowerCase();
            data = data.filter(food => 
                food.name.toLowerCase().includes(keyword) ||
                food.description.toLowerCase().includes(keyword) ||
                food.location.toLowerCase().includes(keyword)
            );
        }

        // 排序
        switch (state.currentSort) {
            case 'name':
                data.sort((a, b) => a.name.localeCompare(b.name, 'zh'));
                break;
            case 'price-asc':
                data.sort((a, b) => a.priceMin - b.priceMin);
                break;
            case 'price-desc':
                data.sort((a, b) => b.priceMax - a.priceMax);
                break;
            case 'rating':
                data.sort((a, b) => b.rating - a.rating);
                break;
        }

        state.filteredData = data;
        Renderer.renderGrid();
        this.updateSearchStatus();
    },

    /**
     * 更新搜索结果提示
     */
    updateSearchStatus() {
        if (state.currentSearch) {
            elements.searchStatus.textContent = `找到 ${state.filteredData.length} 个与"${state.currentSearch}"相关的美食`;
            elements.searchStatus.classList.remove('hidden');
        } else {
            elements.searchStatus.classList.add('hidden');
        }
    }
};

// ========== 模态框模块 ==========
const Modal = {
    /**
     * 打开详情模态框
     * @param {number} foodId - 美食ID
     */
    open(foodId) {
        const food = FOOD_DATA.find(f => f.id === foodId);
        if (!food) return;

        state.currentFoodId = foodId;

        // 填充模态框内容
        const modal = elements.modal;
        const imageEl = modal.querySelector('.modal-image');
        
        // 使用 emoji + 渐变背景（如果有真实图片URL则使用图片）
        if (food.image) {
            imageEl.style.backgroundImage = `url(${food.image})`;
            imageEl.innerHTML = '';
        } else {
            imageEl.style.background = food.gradient;
            imageEl.innerHTML = `<span class="modal-emoji">${food.emoji}</span>`;
        }
        
        modal.querySelector('.modal-category').textContent = food.categoryName;
        modal.querySelector('.modal-title').textContent = food.name;
        modal.querySelector('.modal-rating').innerHTML = Renderer.renderStars(food.rating);
        modal.querySelector('.modal-description').textContent = food.description;
        modal.querySelector('.modal-location').innerHTML = `📍 ${food.location}`;
        modal.querySelector('.modal-price').textContent = `¥${food.priceMin} - ¥${food.priceMax}`;

        // 更新按钮状态
        const likeBtn = modal.querySelector('.like-btn');
        const likeCount = InteractionData.getLikes()[foodId] || 0;
        likeBtn.querySelector('.action-count').textContent = likeCount;
        likeBtn.classList.toggle('liked', likeCount > 0);

        const favBtn = modal.querySelector('.favorite-btn');
        const isFavorited = InteractionData.isFavorited(foodId);
        favBtn.querySelector('.action-text').textContent = isFavorited ? '已收藏' : '收藏';
        favBtn.classList.toggle('favorited', isFavorited);

        // 渲染评论
        this.renderComments(foodId);

        // 清空评论表单
        document.getElementById('commentNickname').value = '';
        document.getElementById('commentContent').value = '';

        // 显示模态框
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    },

    /**
     * 关闭模态框
     */
    close() {
        elements.modal.classList.remove('active');
        elements.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        state.currentFoodId = null;
    },

    /**
     * 渲染评论列表
     * @param {number} foodId - 美食ID
     */
    renderComments(foodId) {
        const comments = InteractionData.getFoodComments(foodId);
        const listEl = elements.modal.querySelector('.comment-list');
        
        if (comments.length === 0) {
            listEl.innerHTML = '<div class="comment-empty">暂无评论，快来发表第一条评论吧！</div>';
            return;
        }

        listEl.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-nickname">${this.escapeHtml(comment.nickname)}</span>
                    <span class="comment-time">${this.formatTime(comment.time)}</span>
                </div>
                <p class="comment-content">${this.escapeHtml(comment.content)}</p>
            </div>
        `).join('');
    },

    /**
     * 格式化时间
     * @param {string} isoTime - ISO时间字符串
     * @returns {string} 格式化后的时间
     */
    formatTime(isoTime) {
        const date = new Date(isoTime);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
        
        return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    },

    /**
     * HTML转义，防止XSS
     * @param {string} text - 原始文本
     * @returns {string} 转义后的文本
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// ========== Lightbox模块 ==========
const Lightbox = {
    /**
     * 打开Lightbox
     * @param {number} index - 图片索引
     */
    open(index) {
        state.lightboxIndex = index;
        this.updateImage();
        elements.lightbox.classList.add('active');
        elements.lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    },

    /**
     * 关闭Lightbox
     */
    close() {
        elements.lightbox.classList.remove('active');
        elements.lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    },

    /**
     * 切换到上一张
     */
    prev() {
        state.lightboxIndex = (state.lightboxIndex - 1 + state.filteredData.length) % state.filteredData.length;
        this.updateImage();
    },

    /**
     * 切换到下一张
     */
    next() {
        state.lightboxIndex = (state.lightboxIndex + 1) % state.filteredData.length;
        this.updateImage();
    },

    /**
     * 更新Lightbox图片
     */
    updateImage() {
        const food = state.filteredData[state.lightboxIndex];
        if (!food) return;
        
        const container = elements.lightbox.querySelector('.lightbox-image');
        if (food.image) {
            container.innerHTML = `<img src="${food.image}" alt="${food.name}" class="lightbox-image">`;
        } else {
            container.innerHTML = `<div class="lightbox-emoji-placeholder" style="background: ${food.gradient}; width: 400px; height: 300px; display: flex; align-items: center; justify-content: center; border-radius: 12px;"><span style="font-size: 120px;">${food.emoji}</span></div>`;
        }
        elements.lightbox.querySelector('.lightbox-caption').textContent = `${food.name} - ${food.location}`;
    }
};

// ========== Toast提示模块 ==========
const Toast = {
    /**
     * 显示Toast提示
     * @param {string} message - 提示内容
     * @param {number} duration - 显示时长（毫秒）
     */
    show(message, duration = 2000) {
        elements.toast.textContent = message;
        elements.toast.classList.add('show');
        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, duration);
    }
};

// ========== 滚动动效模块 ==========
const ScrollEffect = {
    observer: null,

    /**
     * 初始化Intersection Observer
     */
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    },

    /**
     * 观察新元素
     */
    observe() {
        if (!this.observer) this.init();
        document.querySelectorAll('.fade-in-up:not(.visible)').forEach(el => {
            this.observer.observe(el);
        });
    }
};

// ========== 事件绑定 ==========
function bindEvents() {
    // 筛选按钮点击
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentFilter = btn.dataset.filter;
            Filter.apply();
        });
    });

    // 搜索框
    elements.searchBtn.addEventListener('click', () => {
        state.currentSearch = elements.searchInput.value.trim();
        Filter.apply();
    });

    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            state.currentSearch = elements.searchInput.value.trim();
            Filter.apply();
        }
    });

    // 实时搜索（输入时防抖）
    let searchTimer;
    elements.searchInput.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            state.currentSearch = elements.searchInput.value.trim();
            Filter.apply();
        }, 300);
    });

    // 排序选择
    elements.sortSelect.addEventListener('change', () => {
        state.currentSort = elements.sortSelect.value;
        Filter.apply();
    });

    // 卡片点击打开模态框（事件委托）
    elements.foodGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.food-card');
        if (!card) return;

        // 如果点击的是操作按钮，不打开模态框
        if (e.target.closest('.card-action-btn')) return;

        const foodId = parseInt(card.dataset.id);
        Modal.open(foodId);
    });

    // 卡片上的点赞按钮（事件委托）
    elements.foodGrid.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.like-btn');
        if (!likeBtn) return;

        e.stopPropagation();
        const foodId = parseInt(likeBtn.dataset.id);
        const newCount = InteractionData.like(foodId);
        likeBtn.classList.add('liked');
        likeBtn.querySelector('.like-count').textContent = newCount;
        Toast.show('点赞成功！👍');
    });

    // 卡片上的收藏按钮（事件委托）
    elements.foodGrid.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.favorite-btn');
        if (!favBtn) return;

        e.stopPropagation();
        const foodId = parseInt(favBtn.dataset.id);
        const isFavorited = InteractionData.toggleFavorite(foodId);
        favBtn.classList.toggle('favorited', isFavorited);
        favBtn.querySelector('.action-text').textContent = isFavorited ? '已收藏' : '收藏';
        Toast.show(isFavorited ? '收藏成功！⭐' : '已取消收藏');
    });

    // 模态框关闭
    elements.modal.querySelector('.modal-close').addEventListener('click', () => Modal.close());
    elements.modal.querySelector('.modal-backdrop').addEventListener('click', () => Modal.close());

    // 模态框内的操作按钮
    elements.modal.querySelector('.like-btn').addEventListener('click', () => {
        if (!state.currentFoodId) return;
        const newCount = InteractionData.like(state.currentFoodId);
        const btn = elements.modal.querySelector('.like-btn');
        btn.classList.add('liked');
        btn.querySelector('.action-count').textContent = newCount;
        
        // 同步更新卡片上的点赞数
        const cardBtn = elements.foodGrid.querySelector(`.like-btn[data-id="${state.currentFoodId}"]`);
        if (cardBtn) {
            cardBtn.classList.add('liked');
            cardBtn.querySelector('.like-count').textContent = newCount;
        }
        Toast.show('点赞成功！👍');
    });

    elements.modal.querySelector('.favorite-btn').addEventListener('click', () => {
        if (!state.currentFoodId) return;
        const isFavorited = InteractionData.toggleFavorite(state.currentFoodId);
        const btn = elements.modal.querySelector('.favorite-btn');
        btn.classList.toggle('favorited', isFavorited);
        btn.querySelector('.action-text').textContent = isFavorited ? '已收藏' : '收藏';
        
        // 同步更新卡片上的收藏状态
        const cardBtn = elements.foodGrid.querySelector(`.favorite-btn[data-id="${state.currentFoodId}"]`);
        if (cardBtn) {
            cardBtn.classList.toggle('favorited', isFavorited);
            cardBtn.querySelector('.action-text').textContent = isFavorited ? '已收藏' : '收藏';
        }
        Toast.show(isFavorited ? '收藏成功！⭐' : '已取消收藏');
    });

    elements.modal.querySelector('.share-btn').addEventListener('click', () => {
        const food = FOOD_DATA.find(f => f.id === state.currentFoodId);
        if (!food) return;
        
        const shareText = `推荐美食：${food.name} - ${food.description} 📍${food.location}`;
        
        // 尝试使用Web Share API
        if (navigator.share) {
            navigator.share({
                title: food.name,
                text: shareText,
                url: window.location.href
            }).catch(() => {
                // 用户取消分享时复制到剪贴板
                copyToClipboard(shareText);
            });
        } else {
            copyToClipboard(shareText);
        }
    });

    // 模态框图片点击打开Lightbox
    elements.modal.querySelector('.modal-image').addEventListener('click', () => {
        const index = state.filteredData.findIndex(f => f.id === state.currentFoodId);
        if (index !== -1) {
            Lightbox.open(index);
        }
    });

    // 评论提交
    document.getElementById('commentSubmit').addEventListener('click', () => {
        if (!state.currentFoodId) return;
        
        const nickname = document.getElementById('commentNickname').value.trim();
        const content = document.getElementById('commentContent').value.trim();
        
        if (!content) {
            Toast.show('请输入评论内容');
            return;
        }
        
        InteractionData.addComment(state.currentFoodId, nickname, content);
        Modal.renderComments(state.currentFoodId);
        document.getElementById('commentContent').value = '';
        Toast.show('评论发表成功！💬');
    });

    // Lightbox控制
    elements.lightbox.querySelector('.lightbox-close').addEventListener('click', () => Lightbox.close());
    elements.lightbox.querySelector('.lightbox-backdrop').addEventListener('click', () => Lightbox.close());
    elements.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => Lightbox.prev());
    elements.lightbox.querySelector('.lightbox-next').addEventListener('click', () => Lightbox.next());

    // ESC键关闭模态框和Lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (elements.lightbox.classList.contains('active')) {
                Lightbox.close();
            } else if (elements.modal.classList.contains('active')) {
                Modal.close();
            }
        }
        
        // Lightbox左右箭头键
        if (elements.lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') Lightbox.prev();
            if (e.key === 'ArrowRight') Lightbox.next();
        }
    });
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        Toast.show('已复制到剪贴板，快去分享吧！🔗');
    }).catch(() => {
        Toast.show('复制失败，请手动复制');
    });
}

// ========== 初始化 ==========
function init() {
    ScrollEffect.init();
    Filter.apply();
    bindEvents();
    console.log('班级美食地图已加载完成 🍜');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
