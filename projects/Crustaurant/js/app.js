function openMenuBurger() 
{
    let x = document.getElementById("burgerlink");
    
    if (x.getAttribute("data-state") === "open") 
    {
        x.setAttribute("data-state", "close");
    }

    else 
    {
        x.setAttribute("data-state", "open");
    }
}