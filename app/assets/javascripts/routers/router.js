CanineCareApp.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#canineCareApp');
  },

  routes: {
    '': 'dashboard',
    'dogs': 'dogsIndex',
    'session/new' : 'signIn',
    'users/new': 'signUp',
    'contact' : 'contactPage',
    'about' : 'aboutPage',
    'services' : 'servicesPage',
    'dogs/new': 'dogNew',
    'dogs/:id/edit': 'dogEdit',
    'dogs/:id': 'dogShow',
    'sitters/new': 'sitterNew',
    'sitters/:id': 'sitterShow',
    'sitters/:id/edit': 'sitterEdit',
    'bookings/:id/new': 'newBooking',
    'sitters/:id/bookings' : 'bookingIndex'
  },

  dashboard: function () {
    var dashboardView = new CanineCareApp.Views.Dashboard();
    this._swapView(dashboardView);
    $(document).on('ready', function () {
        dashboardInit($);
        chartInit($);
        mainInit($);
        widgetsInit($);
    });
  },

  signIn: function () {
    var signInView = new CanineCareApp.Views.SignInPage();
    this._swapView(signInView);
  },

  signUp: function () {
    var signUpView = new CanineCareApp.Views.SignUpPage();
    this._swapView(signUpView);
  },

  aboutPage: function () {
    var aboutView = new CanineCareApp.Views.AboutPage();
    this._swapView(aboutView);
  },

  contactPage: function () {
    var contactView = new CanineCareApp.Views.ContactPage();
    this._swapView(contactView);
  },

  servicesPage: function () {
    var servicesView = new CanineCareApp.Views.ServicesPage();
    this._swapView(servicesView);
  },


  dogsIndex: function () {
    CanineCareApp.Collections.dogs.fetch();

    var dogsView = new CanineCareApp.Views.DogsIndex({
      collection: CanineCareApp.Collections.dogs
    });

    this._swapView(dogsView);
  },

  dogShow: function(id) {
    var dog = CanineCareApp.Collections.dogs.getOrFetch(id);
    var showDogView = new CanineCareApp.Views.DogShow({
      model: dog
    });

    this._swapView(showDogView);
  },

  dogNew: function() {
    var dog = new CanineCareApp.Models.Dog();
    var newDogView = new CanineCareApp.Views.DogForm({
      model: dog,
      collection: CanineCareApp.Collections.dogs
    });

    this._swapView(newDogView);
  },

  dogEdit: function(id) {
    var dog = CanineCareApp.Collections.dogs.getOrFetch(id);

    var editDogView = new CanineCareApp.Views.DogForm({
      model: dog,
      collection: CanineCareApp.Collections.dogs
    });

    this._swapView(editDogView);
  },

  sitterNew: function() {
    var sitter = new CanineCareApp.Models.Sitter();
    var newSitterView = new CanineCareApp.Views.SitterForm({
      model: sitter,
      collection: CanineCareApp.Collections.sitters
    });

    this._swapView(newSitterView);

  },

  sitterShow: function(id) {
    var sitter = CanineCareApp.Collections.sitters.getOrFetch(id);
    var showSitterView = new CanineCareApp.Views.SitterShow({
      model: sitter
    });

    this._swapView(showSitterView);
  },

  sittersIndex: function() {
    CanineCareApp.Collections.sitters.fetch();
    var sittersView = new CanineCareApp.Views.SittersIndex({
      collection: CanineCareApp.Collections.sitters
    });

    this._swapView(sittersView);
  },

  sitterEdit: function(id) {
    var sitter = CanineCareApp.Collections.sitters.getOrFetch(id);

    var editSitterView = new CanineCareApp.Views.SitterForm({
      model: sitter,
      collection: CanineCareApp.Collections.sitters
    });

    this._swapView(editSitterView);
  },

  newBooking: function(id) {
    var sitterId= parseInt(id);
    var booking = new CanineCareApp.Models.Booking({sitter_id: sitterId});
    var dogs = CanineCareApp.Collections.dogs;
    dogs.fetch();

    var newBookingView = new CanineCareApp.Views.NewSitterBooking({
      model: booking,
      collection: CanineCareApp.Collections.sitterbookings,
      dogs: dogs
    });

    this._swapView(newBookingView);
  },

  bookingIndex: function(id) {
      var sitterId = parseInt(id);
      var sitter = CanineCareApp.Collections.sitters.getOrFetch(id);
      var bookingView = new CanineCareApp.Views.SitterBookingIndex({
          model: sitter
      });

      this._swapView(bookingView);
  },

  _swapView: function (view) {
    if (this.currentView && this.currentView.remove()) {
        this.currentView = view;
    }

    this.$rootEl.html(view.render().$el);
  }
});




function dashboardInit($) {
    $.find('a').forEach(function(){

      var cUrl = String(window.location).split('?')[0];

      if (cUrl.substr(cUrl.length - 1) == '#') {
        cUrl = cUrl.slice(0,-1);
      }

      if ($($(this))[0].href==cUrl) {
        $(this).addClass('active');

        $(this).parents('ul').add(this).each(function(){
          $(this).parent().addClass('open');
        });
      }
    });

    // // Dropdown Menu
    // $.on('click', 'a', function(e){
    //
    //   if ($.ajaxLoad) {
    //     e.preventDefault();
    //   }
    //
    //   if ($(this).hasClass('nav-dropdown-toggle')) {
    //     $(this).parent().toggleClass('open');
    //     resizeBroadcast();
    //   }
    // });

    /* ---------- Main Menu Open/Close, Min/Full ---------- */
    $('.sidebar-toggler').click(function(){
      $('body').toggleClass('sidebar-hidden');
      resizeBroadcast();
    });

    $('.sidebar-minimizer').click(function(){
      $('body').toggleClass('sidebar-minimized');
      resizeBroadcast();
    });

    $('.brand-minimizer').click(function(){
      $('body').toggleClass('brand-minimized');
    });

    $('.aside-menu-toggler').click(function(){
      $('body').toggleClass('aside-menu-hidden');
      resizeBroadcast();
    });

    $('.mobile-sidebar-toggler').click(function(){
      $('body').toggleClass('sidebar-mobile-show');
      resizeBroadcast();
    });

    $('.sidebar-close').click(function(){
      $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
    });

    /* ---------- Disable moving to top ---------- */
    $('a[href="#"][data-top!=true]').click(function(e){
      e.preventDefault();
    });

  /****
  * CARDS ACTIONS
  */

  $(document).on('click', '.card-actions a', function(e){
    e.preventDefault();

    if ($(this).hasClass('btn-close')) {
      $(this).parent().parent().parent().fadeOut();
    } else if ($(this).hasClass('btn-minimize')) {
      var $target = $(this).parent().parent().next('.card-body');
      if (!$(this).hasClass('collapsed')) {
        $('i',$(this)).removeClass($.panelIconOpened).addClass($.panelIconClosed);
      } else {
        $('i',$(this)).removeClass($.panelIconClosed).addClass($.panelIconOpened);
      }
    } else if ($(this).hasClass('btn-setting')) {
      $('#myModal').modal('show');
  }
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function init(url) {

  /* ---------- Tooltip ---------- */
  $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"bottom",delay: { show: 400, hide: 200 }});

  /* ---------- Popover ---------- */
  $('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();

}

function resizeBroadcast() {
  var timesRun = 0;
  var interval = setInterval(function(){
    timesRun += 1;
    if(timesRun === 5){
      clearInterval(interval);
    }
    window.dispatchEvent(new Event('resize'));
  }, 62.5);
}



function chartInit($) {
    'use strict';
    var randomScalingFactor = function(){ return Math.round(Math.random()*100);};
    var lineChartData = {
        labels : ['January','February','March','April','May','June','July'],
        datasets : [
          {
            label: 'My First dataset',
            backgroundColor : 'rgba(220,220,220,0.2)',
            borderColor : 'rgba(220,220,220,1)',
            pointBackgroundColor : 'rgba(220,220,220,1)',
            pointBorderColor : '#fff',
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
          },
          {
            label: 'My Second dataset',
            backgroundColor : 'rgba(151,187,205,0.2)',
            borderColor : 'rgba(151,187,205,1)',
            pointBackgroundColor : 'rgba(151,187,205,1)',
            pointBorderColor : '#fff',
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
          }
        ]
    };

    var ctx = document.getElementById('canvas-1');
    var chart = new Chart(ctx, {
    type: 'line',
    data: lineChartData,
    options: {
      responsive: true
    }
    });


    randomScalingFactor = function(){ return Math.round(Math.random()*100);};
    var barChartData = {
        labels : ['January','February','March','April','May','June','July'],
        datasets : [
          {
            backgroundColor : 'rgba(220,220,220,0.5)',
            borderColor : 'rgba(220,220,220,0.8)',
            highlightFill: 'rgba(220,220,220,0.75)',
            highlightStroke: 'rgba(220,220,220,1)',
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
          },
          {
            backgroundColor : 'rgba(151,187,205,0.5)',
            borderColor : 'rgba(151,187,205,0.8)',
            highlightFill : 'rgba(151,187,205,0.75)',
            highlightStroke : 'rgba(151,187,205,1)',
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
          }
        ]
    };
    ctx = document.getElementById('canvas-2');
    chart = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      responsive: true
    }
    });


    var doughnutData = {
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
    };
    ctx = document.getElementById('canvas-3');
    chart = new Chart(ctx, {
    type: 'doughnut',
    data: doughnutData,
    options: {
      responsive: true
    }
    });


    var radarChartData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(220,220,220,0.2)',
        borderColor: 'rgba(220,220,220,1)',
        pointBackgroundColor: 'rgba(220,220,220,1)',
        pointBorderColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65,59,90,81,56,55,40]
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'rgba(151,187,205,0.2)',
        borderColor: 'rgba(151,187,205,1)',
        pointBackgroundColor: 'rgba(151,187,205,1)',
        pointBorderColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28,48,40,19,96,27,100]
      }
    ]
    };
    ctx = document.getElementById('canvas-4');
    chart = new Chart(ctx, {
    type: 'radar',
    data: radarChartData,
    options: {
      responsive: true
    }
    });


    var pieData = {
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
    };
    ctx = document.getElementById('canvas-5');
    chart = new Chart(ctx, {
    type: 'pie',
    data: pieData,
    options: {
      responsive: true
    }
    });


    var polarData = {
    datasets: [{
      data: [
        11,
        16,
        7,
        3,
        14
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB'
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Red',
      'Green',
      'Yellow',
      'Grey',
      'Blue'
    ]
    };
    ctx = document.getElementById('canvas-6');
    chart = new Chart(ctx, {
    type: 'polarArea',
    data: polarData,
    options: {
      responsive: true
    }
    });
}


function mainInit($) {
    'use strict';

    //convert Hex to RGBA
    function convertHex(hex,opacity){
      hex = hex.replace('#','');
      var r = parseInt(hex.substring(0,2), 16);
      var g = parseInt(hex.substring(2,4), 16);
      var b = parseInt(hex.substring(4,6), 16);

      var result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
      return result;
    }

    //Cards with Charts
    var labels = ['January','February','March','April','May','June','July'];
    var data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: $.brandPrimary,
          borderColor: 'rgba(255,255,255,.55)',
          data: [65, 59, 84, 84, 51, 55, 40]
        },
      ]
    };
    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent'
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          }

        }],
        yAxes: [{
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, data.datasets[0].data) - 5,
            max: Math.max.apply(Math, data.datasets[0].data) + 5,
          }
        }],
      },
      elements: {
        line: {
          borderWidth: 1
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      }
    };
    var ctx = $('#card-chart1');
    var cardChart1 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    var data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: $.brandInfo,
          borderColor: 'rgba(255,255,255,.55)',
          data: [1, 18, 9, 17, 34, 22, 11]
        },
      ]
    };
    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent'
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          }

        }],
        yAxes: [{
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, data.datasets[0].data) - 5,
            max: Math.max.apply(Math, data.datasets[0].data) + 5,
          }
        }],
      },
      elements: {
        line: {
          tension: 0.00001,
          borderWidth: 1
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      }
    };
    var ctx = $('#card-chart2');
    var cardChart2 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }],
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
        },
      }
    };
    var data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,255,255,.2)',
          borderColor: 'rgba(255,255,255,.55)',
          data: [78, 81, 80, 45, 34, 12, 40]
        },
      ]
    };
    var ctx = $('#card-chart3');
    var cardChart3 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    //Random Numbers
    function random(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }

    var elements = 16;
    var labels = [];
    var data = [];

    for (var i = 2000; i <= 2000 + elements; i++) {
      labels.push(i);
      data.push(random(40,100));
    }

    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false,
          barPercentage: 0.6,
        }],
        yAxes: [{
          display: false,
        }]
      },

    };
    var data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'rgba(255,255,255,.3)',
          borderColor: 'transparent',
          data: data
        },
      ]
    };
    var ctx = $('#card-chart4');
    var cardChart4 = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });

    //Main Chart
    var elements = 27;
    var data1 = [];
    var data2 = [];
    var data3 = [];

    for (var i = 0; i <= elements; i++) {
      data1.push(random(50,200));
      data2.push(random(80,100));
      data3.push(65);
    }

    var data = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: convertHex($.brandInfo,10),
          borderColor: $.brandInfo,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: data1
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'transparent',
          borderColor: $.brandSuccess,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: data2
        },
        {
          label: 'My Third dataset',
          backgroundColor: 'transparent',
          borderColor: $.brandDanger,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          borderDash: [8, 5],
          data: data3
        }
      ]
    };

    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250
          }
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        }
      },
    };
    var ctx = $('#main-chart');
    var mainChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });


    //Social Box Charts
    var labels = ['January','February','March','April','May','June','July'];

    var options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          display:false,
        }],
        yAxes: [{
          display:false,
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        }
      }
    };

    var data1 = {
      labels: labels,
      datasets: [{
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [65, 59, 84, 84, 51, 55, 40]
      }]
    };
    var ctx = $('#social-box-chart-1');
    var socialBoxChart1 = new Chart(ctx, {
      type: 'line',
      data: data1,
      options: options
    });

    var data2 = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'rgba(255,255,255,.1)',
          borderColor: 'rgba(255,255,255,.55)',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: [1, 13, 9, 17, 34, 41, 38]
        }
      ]
    };
    var ctx = $('#social-box-chart-2').get(0).getContext('2d');
    var socialBoxChart2 = new Chart(ctx, {
      type: 'line',
      data: data2,
      options: options
    });

    var data3 = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'rgba(255,255,255,.1)',
          borderColor: 'rgba(255,255,255,.55)',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: [78, 81, 80, 45, 34, 12, 40]
        }
      ]
    };
    var ctx = $('#social-box-chart-3').get(0).getContext('2d');
    var socialBoxChart3 = new Chart(ctx, {
      type: 'line',
      data: data3,
      options: options
    });

    var data4 = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'rgba(255,255,255,.1)',
          borderColor: 'rgba(255,255,255,.55)',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: [35, 23, 56, 22, 97, 23, 64]
        }
      ]
    };
    var ctx = $('#social-box-chart-4').get(0).getContext('2d');
    var socialBoxChart4 = new Chart(ctx, {
      type: 'line',
      data: data4,
      options: options
    });



    //Sparkline Charts
    var labels = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    var options = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          display:false,
        }],
        yAxes: [{
          display:false,
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        }
      },
    };

    var data1 = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: $.brandPrimary,
          borderWidth: 2,
          data: [35, 23, 56, 22, 97, 23, 64]
        }
      ]
    };
    var ctx = $('#sparkline-chart-1');
    var sparklineChart1 = new Chart(ctx, {
      type: 'line',
      data: data1,
      options: options
    });

    var data2 = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: $.brandDanger,
          borderWidth: 2,
          data: [78, 81, 80, 45, 34, 12, 40]
        }
      ]
    };
    var ctx = $('#sparkline-chart-2');
    var sparklineChart2 = new Chart(ctx, {
      type: 'line',
      data: data2,
      options: options
    });

    var data3 = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: $.brandWarning,
          borderWidth: 2,
          data: [35, 23, 56, 22, 97, 23, 64]
        }
      ]
    };
    var ctx = $('#sparkline-chart-3');
    var sparklineChart3 = new Chart(ctx, {
      type: 'line',
      data: data3,
      options: options
    });

    var data4 = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: $.brandSuccess,
          borderWidth: 2,
          data: [78, 81, 80, 45, 34, 12, 40]
        }
      ]
    };
    var ctx = $('#sparkline-chart-4');
    var sparklineChart4 = new Chart(ctx, {
      type: 'line',
      data: data4,
      options: options
    });

    var data5 = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: '#d1d4d7',
          borderWidth: 2,
          data: [35, 23, 56, 22, 97, 23, 64]
        }
      ]
    };
    var ctx = $('#sparkline-chart-5');
    var sparklineChart5 = new Chart(ctx, {
      type: 'line',
      data: data5,
      options: options
    });

    var data6 = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: $.brandInfo,
          borderWidth: 2,
          data: [78, 81, 80, 45, 34, 12, 40]
        }
      ]
    };
    var ctx = $('#sparkline-chart-6');
    var sparklineChart6= new Chart(ctx, {
      type: 'line',
      data: data6,
      options: options
    });
}


function widgetsInit($) {
    'use strict';

    //convert Hex to RGBA
    function convertHex(hex,opacity){
      hex = hex.replace('#','');
      var r = parseInt(hex.substring(0,2), 16);
      var g = parseInt(hex.substring(2,4), 16);
      var b = parseInt(hex.substring(4,6), 16);

      var result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
      return result;
    }

    //Cards with Charts
    var labels = ['January','February','March','April','May','June','July'];
    var data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: $.brandPrimary,
          borderColor: 'rgba(255,255,255,.55)',
          data: [65, 59, 84, 84, 51, 55, 40]
        },
      ]
    };
    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent'
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          }

        }],
        yAxes: [{
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, data.datasets[0].data) - 5,
            max: Math.max.apply(Math, data.datasets[0].data) + 5,
          }
        }],
      },
      elements: {
        line: {
          borderWidth: 1
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      }
    };
    var ctx = $('#card-chart1');
    var cardChart1 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    var data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: $.brandInfo,
          borderColor: 'rgba(255,255,255,.55)',
          data: [1, 18, 9, 17, 34, 22, 11]
        },
      ]
    };

    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent'
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          }

        }],
        yAxes: [{
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, data.datasets[0].data) - 5,
            max: Math.max.apply(Math, data.datasets[0].data) + 5,
          }
        }],
      },
      elements: {
        line: {
          tension: 0.00001,
          borderWidth: 1
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      }
    };
    var ctx = $('#card-chart2');
    var cardChart2 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }],
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
        },
      }
    };
    var data = {
      maintainAspectRatio: false,
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,255,255,.2)',
          borderColor: 'rgba(255,255,255,.55)',
          data: [78, 81, 80, 45, 34, 12, 40]
        },
      ]
    };
    var ctx = $('#card-chart3');
    var cardChart3 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    //Random Numbers
    function random(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }

    var elements = 16;
    var labels = [];
    var data = [];

    for (var i = 2000; i <= 2000 + elements; i++) {
      labels.push(i);
      data.push(random(40,100));
    }


    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false,
          barPercentage: 0.7,
        }],
        yAxes: [{
          display: false,
        }]
      },

    };
    var data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: 'rgba(255,255,255,.3)',
          borderColor: 'transparent',
          data: data
        },
      ]
    };
    var ctx = $('#card-chart4');
    var cardChart4 = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });


    var elements = 15;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
      labels.push(i);
      data.push(random(40,100));
    }

    var options = {
      responsive: false,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    };
    var data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: $.brandPrimary,
          borderColor: 'transparent',
          borderWidth: 1,
          data: data
        },
      ]
    };
    var ctx = $('#chart-1');
    var Chart1 = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });


    var elements = 15;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
      labels.push(i);
      data.push(random(40,100));
    }

    var options = {
      responsive: false,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    };
    var data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: $.brandWarning,
          borderColor: 'transparent',
          borderWidth: 1,
          data: data
        },
      ]
    };
    var ctx = $('#chart-2');
    var Chart2 = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });


    var elements = 15;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
      labels.push(i);
      data.push(random(40,100));
    }

    var options = {
      responsive: false,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    };
    var data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: $.brandSuccess,
          borderColor: 'transparent',
          borderWidth: 1,
          data: data
        },
      ]
    };
    var ctx = $('#chart-3');
    var Chart3 = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });

    var options = {
      responsive: false,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      elements: { point: { radius: 0 } }
    };
    var data = {
      labels: ['January','February','March','April','May','June','July'],
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: $.brandInfo,
          borderWidth: 2,
          data: [65, 59, 84, 84, 51, 55, 40]
        },
      ]
    };
    var ctx = $('#chart-4');
    var Chart4 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });


    var options = {
      responsive: false,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      elements: { point: { radius: 0 } }
    };
    var data = {
      labels: ['January','February','March','April','May','June','July'],
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: $.brandSuccess,
          borderWidth: 2,
          data: [65, 59, 84, 84, 51, 55, 40]
        },
      ]
    };
    var ctx = $('#chart-5');
    var Chart5 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });


    var options = {
      responsive: false,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      elements: { point: { radius: 0 } }
    };
    var data = {
      labels: ['January','February','March','April','May','June','July'],
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: $.brandDanger,
          borderWidth: 2,
          data: [65, 59, 84, 84, 51, 55, 40]
        },
      ]
    };
    var ctx = $('#chart-6');
    var Chart6 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });


    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display:false,
          points:false,
        }],
        yAxes: [{
          display:false,
        }]
      },
      elements: { point: { radius: 0 } }
    };
    var data = {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255,.55)',
          borderWidth: 2,
          data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9]
        },
      ]
    };
    var ctx = $('.chart-7');
    var Chart7 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    var ctx = $('.chart-7-2');
    var Chart72 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    var ctx = $('.chart-7-3');
    var Chart73 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    var ctx = $('.chart-7-4');
    var Chart74 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });


    var options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display:false,
          barPercentage: 0.6,
        }],
        yAxes: [{
          display:false,
          ticks: {
            beginAtZero: true,
          }
        }]
      },
    };
    var data = {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        {
          backgroundColor: 'rgba(0,0,0,.2)',
          data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9]
        },
      ]
    };
    var ctx = $('.chart-8');
    var Chart8 = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });

    var ctx = $('.chart-8-2');
    var Chart82 = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });

    var ctx = $('.chart-8-3');
    var Chart83 = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });

    var ctx = $('.chart-8-4');
    var Chart84 = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
}
