(self["webpackChunk"] = self["webpackChunk"] || []).push([["favorite"],{

/***/ "./assets/js/favorite.js":
/*!*******************************!*\
  !*** ./assets/js/favorite.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
__webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
__webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner tous les boutons de favoris
  var favoriteButtons = document.querySelectorAll(".favorite-toggle");
  favoriteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var _this = this;
      // Vérifier s'il s'agit d'une vidéo ou d'une émission
      var videoId = this.dataset.videoId;
      var showId = this.dataset.showId;
      var url;
      if (videoId) {
        url = "/favoris/toggle-video/".concat(videoId);
      } else if (showId) {
        url = "/favoris/toggle-show/".concat(showId);
      } else {
        console.error("ID non trouvé sur le bouton de favoris");
        return;
      }

      // Envoyer une requête AJAX pour basculer l'état du favori
      fetch(url, {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.success) {
          // Mettre à jour l'apparence du bouton
          if (data.isFavorite) {
            _this.classList.add("active");
            var icon = _this.querySelector("i");
            // Adaptez ces classes selon votre template
            if (icon.classList.contains("ri-heart-line")) {
              icon.classList.remove("ri-heart-line");
              icon.classList.add("ri-heart-fill");
            } else if (icon.classList.contains("far")) {
              icon.classList.remove("far");
              icon.classList.add("fas");
            }
            if (_this.querySelector("span")) {
              _this.querySelector("span").textContent = "Retirer des favoris";
            }
          } else {
            _this.classList.remove("active");
            var _icon = _this.querySelector("i");
            // Adaptez ces classes selon votre template
            if (_icon.classList.contains("ri-heart-fill")) {
              _icon.classList.remove("ri-heart-fill");
              _icon.classList.add("ri-heart-line");
            } else if (_icon.classList.contains("fas")) {
              _icon.classList.remove("fas");
              _icon.classList.add("far");
            }
            if (_this.querySelector("span")) {
              _this.querySelector("span").textContent = "Ajouter aux favoris";
            }
          }
        }
      })["catch"](function (error) {
        console.error("Erreur lors de la mise à jour des favoris:", error);
      });
    });
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-slice_js-node_modules_core-js_internals_environm-6766de","vendors-node_modules_core-js_internals_an-instance_js-node_modules_core-js_internals_define-b-9a7a2a","vendors-node_modules_core-js_modules_es_promise_js","vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_esnext-3c8b62"], () => (__webpack_exec__("./assets/js/favorite.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFTLENBQUNJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtjQUN6Q0YsS0FBSSxDQUFDRixTQUFTLENBQUNLLE1BQU0sQ0FBQyxLQUFLLENBQUM7Y0FDNUJILEtBQUksQ0FBQ0YsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQzNCO1lBQ0EsSUFBSW5CLEtBQUksQ0FBQ3FCLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRTtjQUM5QnJCLEtBQUksQ0FBQ3FCLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQ0csV0FBVyxHQUFHLHFCQUFxQjtZQUNoRTtVQUNGO1FBQ0Y7TUFDRixDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUNqQixLQUFLLEVBQUs7UUFDaEJELE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLDRDQUE0QyxFQUFFQSxLQUFLLENBQUM7TUFDcEUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2Zhdm9yaXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgLy8gU8OpbGVjdGlvbm5lciB0b3VzIGxlcyBib3V0b25zIGRlIGZhdm9yaXNcbiAgY29uc3QgZmF2b3JpdGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mYXZvcml0ZS10b2dnbGVcIik7XG5cbiAgZmF2b3JpdGVCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gVsOpcmlmaWVyIHMnaWwgcydhZ2l0IGQndW5lIHZpZMOpbyBvdSBkJ3VuZSDDqW1pc3Npb25cbiAgICAgIGNvbnN0IHZpZGVvSWQgPSB0aGlzLmRhdGFzZXQudmlkZW9JZDtcbiAgICAgIGNvbnN0IHNob3dJZCA9IHRoaXMuZGF0YXNldC5zaG93SWQ7XG5cbiAgICAgIGxldCB1cmw7XG4gICAgICBpZiAodmlkZW9JZCkge1xuICAgICAgICB1cmwgPSBgL2Zhdm9yaXMvdG9nZ2xlLXZpZGVvLyR7dmlkZW9JZH1gO1xuICAgICAgfSBlbHNlIGlmIChzaG93SWQpIHtcbiAgICAgICAgdXJsID0gYC9mYXZvcmlzL3RvZ2dsZS1zaG93LyR7c2hvd0lkfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiSUQgbm9uIHRyb3V2w6kgc3VyIGxlIGJvdXRvbiBkZSBmYXZvcmlzXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEVudm95ZXIgdW5lIHJlcXXDqnRlIEFKQVggcG91ciBiYXNjdWxlciBsJ8OpdGF0IGR1IGZhdm9yaVxuICAgICAgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIlgtUmVxdWVzdGVkLVdpdGhcIjogXCJYTUxIdHRwUmVxdWVzdFwiLFxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbCdhcHBhcmVuY2UgZHUgYm91dG9uXG4gICAgICAgICAgICBpZiAoZGF0YS5pc0Zhdm9yaXRlKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgY29uc3QgaWNvbiA9IHRoaXMucXVlcnlTZWxlY3RvcihcImlcIik7XG4gICAgICAgICAgICAgIC8vIEFkYXB0ZXogY2VzIGNsYXNzZXMgc2Vsb24gdm90cmUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgaWYgKGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKFwicmktaGVhcnQtbGluZVwiKSkge1xuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZShcInJpLWhlYXJ0LWxpbmVcIik7XG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwicmktaGVhcnQtZmlsbFwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChpY29uLmNsYXNzTGlzdC5jb250YWlucyhcImZhclwiKSkge1xuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZShcImZhclwiKTtcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRoaXMucXVlcnlTZWxlY3RvcihcInNwYW5cIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLnRleHRDb250ZW50ID0gXCJSZXRpcmVyIGRlcyBmYXZvcmlzXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgY29uc3QgaWNvbiA9IHRoaXMucXVlcnlTZWxlY3RvcihcImlcIik7XG4gICAgICAgICAgICAgIC8vIEFkYXB0ZXogY2VzIGNsYXNzZXMgc2Vsb24gdm90cmUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgaWYgKGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKFwicmktaGVhcnQtZmlsbFwiKSkge1xuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZShcInJpLWhlYXJ0LWZpbGxcIik7XG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwicmktaGVhcnQtbGluZVwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChpY29uLmNsYXNzTGlzdC5jb250YWlucyhcImZhc1wiKSkge1xuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZShcImZhc1wiKTtcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYXJcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRoaXMucXVlcnlTZWxlY3RvcihcInNwYW5cIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLnRleHRDb250ZW50ID0gXCJBam91dGVyIGF1eCBmYXZvcmlzXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgbWlzZSDDoCBqb3VyIGRlcyBmYXZvcmlzOlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImZhdm9yaXRlQnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYnV0dG9uIiwiX3RoaXMiLCJ2aWRlb0lkIiwiZGF0YXNldCIsInNob3dJZCIsInVybCIsImNvbmNhdCIsImNvbnNvbGUiLCJlcnJvciIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJzdWNjZXNzIiwiaXNGYXZvcml0ZSIsImNsYXNzTGlzdCIsImFkZCIsImljb24iLCJxdWVyeVNlbGVjdG9yIiwiY29udGFpbnMiLCJyZW1vdmUiLCJ0ZXh0Q29udGVudCJdLCJzb3VyY2VSb290IjoiIn0=