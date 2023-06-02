let money = document.getElementById("money");
      let displayInfo = document.getElementById("displayInfo");
      let bills = document.querySelectorAll("img[src$='rub.jpg']");
      let bill_acc = document.querySelector("img[src$='bill_acc.jpg']");
      let balance = document.getElementById("balance");
      let changeBox = document.getElementById("changeBox");
      let coin = document.getElementById("coin");
      let button = document.getElementById("change_button");
      let btn = document.getElementById("btn");

      btn.addEventListener("click", disableButton);

      function disableButton() {
        btn.disabled = true;
      }

      for (bill of bills) {
        bill.onmousedown = function (e) {
          bill = e.currentTarget;
          bill.style.position = "absolute";
          bill.style.zIndex = 1000;
          bill.style.transform = "rotate(90deg)";
          //устанавливаем слушателя по событию движения мышки
          document.addEventListener("mousemove", moveElement);
          //удаляем слушателя по событию отпускания кнопки мышки
          bill.onmouseup = function () {
            bill.style.zIndex = 1;
            document.removeEventListener("mousemove", moveElement);

            let bill_top = bill.getBoundingClientRect().top;
            let bill_left = bill.getBoundingClientRect().left;
            let bill_right = bill.getBoundingClientRect().right;

            let bill_acc_top = bill_acc.getBoundingClientRect().top;
            let bill_acc_left = bill_acc.getBoundingClientRect().left;
            let bill_acc_right = bill_acc.getBoundingClientRect().right;
            let bill_acc_bottom =
              bill_acc.getBoundingClientRect().bottom -
              (bill_acc.getBoundingClientRect().height / 3) * 2;

            if (
              bill_top > bill_acc_top &&
              bill_left > bill_acc_left &&
              bill_right < bill_acc_right &&
              bill_top < bill_acc_bottom
            ) {
              bill.classList.add("animated");
              setTimeout(function () {
                bill.hidden = true;
              }, 470);

              money.value = +money.value + +bill.dataset.billValue;
              balance.innerHTML = `<i class="fa-solid fa-sack-dollar"></i>Баланс: ${money.value} pуб.`;
            }
          };
          //функция перемещения текущей купюры
          function moveElement(event) {
            let x = event.clientX - 148;
            let y = event.clientY - 62;
            bill.style.top = y + "px";
            bill.style.left = x + "px";
          }
          //отменяем стандартное поведение браузера при drag&drop
          bill.ondragstart = function () {
            return false;
          };
        };
      }
      function startProgressBar(coffeName) {
        let i = 0;
        let progressBar = document.querySelector(".progress-bar");
        displayInfo.innerHTML = `<i class="fa-solid fa-hourglass fa-spin"></i>Приготовление ${coffeName} началось`;
        progressBar.parentElement.hidden = false;

        function progress() {
          i++;
          progressBar.style.width = i + "%";
          if (i == 100) {
            clearInterval(timerId);
            progressBar.parentElement.hidden = true;
            displayInfo.innerHTML = `<i class="fa-solid fa-mug-hot"></i>Ваш ${coffeName} готов!`;
            progressBar.style.width = 0 + "%";
          }
        }
        let timerId = setInterval(progress, 100);
      }

      function getCoffee(price, name) {
        if (money.value >= price) {
          money.value = money.value - price;
          balance.innerHTML = `<i class="fa-solid fa-sack-dollar"></i> Баланс: ${money.value} pуб.`;
          startProgressBar(name);
        } else {
          displayInfo.innerHTML = "Не хватает денег на " + name;
        }
      }
      function getChange(num) {
        let coin;
        let top = getRandom(3, changeBox.getBoundingClientRect().height - 63);
        let left = getRandom(3, changeBox.getBoundingClientRect().width - 63);
        if (num >= 10) coin = 10;
        else if (num >= 5) coin = 5;
        else if (num >= 2) coin = 3;
        else if (num >= 1) coin = 1;

        console.log(coin);
        changeBox.innerHTML += `<img src="img/${coin}rub.png" style="top: ${top}px; left: ${left}px" onclick="removeCoin(this)" class="coin-hover">`;
        balance.innerHTML = `<i class="fa-solid fa-sack-dollar"></i> Баланс: 0 pуб.`;

        if (num - coin !== 0) getChange(num - coin);
      }

      function getRandom(min, max) {
        return Math.random() * (max - min) + min;
      }
      function removeCoin(elem) {
        elem.remove();
      }