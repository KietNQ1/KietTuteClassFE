(function showCurrentDate() {
      var d = new Date();
      var days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
      var dd = String(d.getDate()).padStart(2, '0');
      var mm = String(d.getMonth() + 1).padStart(2, '0');
      var el = document.getElementById('currentDate');
      if (el) el.textContent = days[d.getDay()] + ', ' + dd + '/' + mm + '/' + d.getFullYear();
    })();
    function switchTaskNote(btn) {
      var panel = btn.closest('.panel');
      panel.querySelectorAll('.seg-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var view = btn.dataset.view;
      panel.querySelectorAll('.todo, .note-list').forEach(function (el) {
        el.hidden = el.dataset.view !== view;
      });
      document.getElementById('taskNoteMore').textContent = view === 'todo' ? '3/5' : '+ Thêm ghi chú';
    }
    function setActiveNav(el) {
      document.querySelectorAll('.hnav .hic:not(.s-btn)').forEach(function (n) {
        n.classList.remove('active');
      });
      el.classList.add('active');
    }
    function toggleSearch() {
      var s = document.getElementById('search');
      var input = s.querySelector('.s-input');
      var willOpen = !s.classList.contains('open');
      s.classList.toggle('open');
      if (willOpen) {
        input.focus();
      } else {
        input.blur();
      }
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDrawer();
        document.getElementById('search').classList.remove('open');
      }
    });