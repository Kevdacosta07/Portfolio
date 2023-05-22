function openmenu()
{
    let x = document.getElementById("menulink");

    if(x.getAttribute("data-state") === "open") 
    {
        x.setAttribute("data-state", "close")
    }

    else 
    {
        x.setAttribute("data-state", "open")
    }
}

function closemenu() 
{
    let x = document.getElementById("menulink");

    if(x.getAttribute("data-state") === "open") 
    {
        x.setAttribute("data-state", "close")
    }
}

var btn = document.getElementById("scroll-top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 550 || document.documentElement.scrollTop > 550) 
  {
    btn.style.display = "block";
  }
  else 
  {
    btn.style.display = "none";
  }
}

function goTop() 
{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const ratio = .1;
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const handleIntersect = function(entries, observer) 
{
  entries.forEach(
    function (entry)
  {
    if(entry.intersectionRatio >= ratio) 
    {
      entry.target.classList.add('reveal-visible');
    }

    else 
    {
      entry.target.classList.remove('reveal-visible');
      entry.target.classList.add('reveal');
    }
  })
}

const observer = new IntersectionObserver(handleIntersect, options)

observer.observe(document.querySelector('.reveal'))
document.querySelectorAll('.reveal').forEach( function(r)
{
  observer.observe(r);
})