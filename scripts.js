function learnMore() {
    alert("Marron Story는 밤송이 삼형제의 이야기를 담았습니다!");
}

function validateLogin() {
    const adminId = document.getElementById('adminId').value;
    const adminPassword = document.getElementById('adminPassword').value;
    const loginError = document.getElementById('loginError');

    if (adminId === 'marronstory' && adminPassword === 'marronsj324') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'upload.html';
        return false;
    } else {
        loginError.textContent = '잘못된 관리자 ID 또는 비밀번호입니다.';
        return false;
    }
}

function uploadStory() {
    const storyTitle = document.getElementById('storyTitle').value;
    const storyContent = document.getElementById('storyContent').value;
    const storyPublic = document.getElementById('storyPublic').checked;
    const storyAdminOnly = document.getElementById('storyAdminOnly').checked;
    const uploadError = document.getElementById('uploadError');

    if (storyTitle && storyContent) {
        const storyList = JSON.parse(localStorage.getItem('storyList')) || [];
        storyList.push({ title: storyTitle, content: storyContent, public: storyPublic, adminOnly: storyAdminOnly });
        localStorage.setItem('storyList', JSON.stringify(storyList));
        window.location.href = 'stories.html';
        return false;
    } else {
        uploadError.textContent = '모든 필드를 입력해주세요.';
        return false;
    }
}

function loadStories() {
    const storyList = JSON.parse(localStorage.getItem('storyList')) || [];
    const storyListElement = document.getElementById('storyList');

    storyList.forEach(story => {
        if (story.public && !story.adminOnly) {
            const listItem = document.createElement('li');
            listItem.textContent = story.title;
            storyListElement.appendChild(listItem);
        }
    });
}

function loadAdminStories() {
    const storyList = JSON.parse(localStorage.getItem('storyList')) || [];
    const adminStoryListElement = document.getElementById('adminStoryList');

    storyList.forEach((story, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('story-item');
        listItem.innerHTML = `
            <span class="${story.deleted ? 'deleted' : ''}">${story.title}</span>
            <button class="edit-button" onclick="editStory(${index})">수정</button>
            <button class="delete-button" onclick="deleteStory(${index})">삭제</button>
        `;
        adminStoryListElement.appendChild(listItem);
    });
}

function editStory(index) {
    const storyList = JSON.parse(localStorage.getItem('storyList')) || [];
    const story = storyList[index];

    const storyTitle = prompt('제목', story.title);
    const storyContent = prompt('내용', story.content);

    if (storyTitle !== null && storyContent !== null) {
        storyList[index].title = storyTitle;
        storyList[index].content = storyContent;
        localStorage.setItem('storyList', JSON.stringify(storyList));
        window.location.reload();
    }
}

function deleteStory(index) {
    const storyList = JSON.parse(localStorage.getItem('storyList')) || [];
    storyList[index].title = '';
    storyList[index].content = '';
    localStorage.setItem('storyList', JSON.stringify(storyList));
    window.location.reload();
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const authButton = document.getElementById('authButton');
    const adminPageButton = document.getElementById('adminPageButton');
    if (isLoggedIn) {
        authButton.textContent = 'log out';
        authButton.href = '#';
        authButton.onclick = logOut;
        adminPageButton.style.display = 'inline';
    } else {
        authButton.textContent = 'log in';
        authButton.href = 'login.html';
        adminPageButton.style.display = 'none';
    }
}

function logOut() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('storyList')) {
        loadStories();
    }
    if (document.getElementById('adminStoryList')) {
        loadAdminStories();
    }
});