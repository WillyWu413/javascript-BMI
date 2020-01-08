var CalData = document.querySelector('.result');
var showBMI = document.querySelector('.BMIrecord');
var resultIcon = document.querySelector('.resultIcon');
var data = JSON.parse(localStorage.getItem('BMIdata')) || [];



CalData.addEventListener('click',addData,false);


function addData(e) {
    e.preventDefault();
    var h = document.querySelector('.height').value;
    var w = document.querySelector('.weight').value;
    if(h === '' || w === ''){return}
    var BMI = w/((h/100)*(h/100));
    BMI = BMI.toFixed(2);
    var level;
    if(BMI<18.5) level = '過輕';
    else if(BMI >= 18.5 && BMI <24) level = '理想';
    else if (BMI >= 24 && BMI < 27) level = '過重';
    else if (BMI >= 27 && BMI < 30) level = '輕度肥胖';
    else if (BMI >= 30 && BMI < 35) level = '中度肥胖';
    else level = '過度肥胖';
    var dt = new Date();
    var date = ((dt.getMonth() + 1) + '-' + dt.getDate() + '-' + dt.getFullYear());
    var bmiList = {
        level : level,
        BMI : BMI,
        h : h,
        w : w,
        date : date,
    }
    data.push(bmiList);
    localStorage.setItem('BMIdata',JSON.stringify(data));
    // updateButton(bmiList);
    updateList(data);

    var status = document.querySelector('.status');
    status.innerHTML = '<div class="'+bmiList.level+'resultIcon resultIcon">'+bmiList.BMI+'<br><span class="resultBMI">BMI</span><img src="img/icons_loop.png" class="loopImg"></div><div class="'+bmiList.level+'level">'+bmiList.level+'</div>'
    
    CalData.style.opacity = '0';
}



function updateList() {
    var str = '';
    for(var i = 0 ; i<data.length; i++){
        str += '<tr class="' + data[i].level + 'list"><td class="' + data[i].level + 'Color"><span>' + data[i].level + '</span></td><td><span style="font-size:14px;margin-right:5px;">BMI</span>' + data[i].BMI + '</td><td><span style="font-size:14px;margin-right:5px;">weight</span>' + data[i].w + '</td><td><span style="font-size:14px;margin-right:5px;">height</span>' + data[i].h + '</td><td>' + data[i].date +'</td></tr>'
    }
    showBMI.innerHTML = str;
}

