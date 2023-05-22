// On récupère les divers éléments
const navigationDropDown = document.querySelector("#dropdown-mobile-nav");
const mobileCarousel = document.querySelector(".carousel");
const fillBar = document.querySelectorAll(".fill-loading");
const autoSliderController = document.getElementById("autoSliderController");
const textAppearElement = document.querySelector("#appearText");
const contactPage = document.querySelector(".contact-page");
const box = document.querySelectorAll(".input-box");
const globalErrorMessageContainer = document.querySelector(".globalMessageContainer");
const globalErrorMessage = document.querySelector(".globalMessageText");
const submit = document.querySelector(".submit");
const textArea = document.querySelector("textarea");
const textAreaBox = document.querySelector(".textArea-box");
const intro = document.querySelector(".intro")


let intervalID; // Variable qui stock l'interval pour le slider
let imageIndex = 0; // Variable qui permet de savoir à quelle image on se trouve (slider)
let maxImages = document.querySelectorAll(".skill-card").length; // Variable qui stock le nombre de carte que contient le slider
let sliderRunning = true; // Variable qui définit si le sliderauto est actif ou non
let isValid = false; // Variable qui définit si le formulaire est valide ou non

// Objet qui contient tous les regex
obj =
    {
        firstname:
            {
                regex: /^[a-z]{3,}$/i,
            },

        lastname:
            {
                regex: /^[a-z]{3,}$/i
            },

        mail:
            {
                regex: /^[a-z0-9._-]{3,}@[a-z]{3,}\.[a-z]{2,5}$/i
            },

        phone:
            {
                regex: /^(076|078|079)[0-9]{7}$/
            }
    }


// -------------------- SCROLL -------------------- //

// Fonction qui permet de scroller jusqu'à la section "Projets"
function scrollToProjects()
{
    const d = document.querySelector(".project-container") // On récupère la section projet
    d.scrollIntoView(); // On scroll jusqu'à l'élément
}

// Fonction qui permet de scroller jusqu'à la section "Compétences"
function scrollToSkills()
{
    const d = document.querySelector(".skills-container") // On récupère la section compétences
    d.scrollIntoView(); // On scroll jusqu'à l'élément
}




// -------------------- MENU BURGER -------------------- //

// Fonction qui permet d'ouvrir et fermer le menu de navigation au format mobile (menu burger)
function openCloseMenu()
{
    // On stock la valeur de l'attribut "data-state"
    let state = navigationDropDown.getAttribute("data-state");

    // On vérifie si le menu est ouvert ou fermé
    if (state === "opened")
    {
        // On définit l'attribut "data-state" sur fermé
        navigationDropDown.setAttribute("data-state", "closed");
        return; // On return pour arrêter la fonction
    }

    // On définit l'attribut "data-state" sur ouvert
    navigationDropDown.setAttribute("data-state", "opened")
}


// -------------------- INTRO VIDEO -------------------- //

// Fonction qui ferme la vidéo d'intro
function closeIntro()
{
    textAppear(); // On lance l'affichage du texte automatique


    intro.setAttribute("data-state", "close") // On définit l'attribut data-state sur close pour fermer le menu d'intro

    intro.style.backgroundColor = "transparent" // On définit la couleur de fond en transparent

    const video = intro.querySelector("video"); // On récupère l'élément vidéo présent dans la div intro
    let borderCount = 0; // On crée une variable pour l'animation des bordures

    // Animation des bordures
    let timer = setInterval(e =>
    {
        borderCount += 1; // On incrémente de 1 la variable

        // On vérifie si bordercount est strictement égal à 100
        if (borderCount === 100)
        {
            clearInterval(timer) // On supprime l'interval
        }

        video.style.borderRadius = "0 0 " + borderCount + "% " + borderCount + "%"; // On modifie le border radius
    }, 15)

    // Timeout qui s'exécute après 1,2s
    setTimeout(e =>
    {
        document.body.style.overflowY = "visible" // On affiche le scroll vertical
        intro.remove(); // On supprime l'intro
    }, 1200)
}





// -------------------- FORMULAIRE DE CONTACT -------------------- //


// Event Listener
submit.addEventListener("click", checkAllForm);

// On boucle le tableau qui contient l'ensemble des boxs du formulaires
box.forEach(b => {

    let dataId = b.getAttribute("data-id"); // On récupère la valeur de l'attribut "name"
    let element = b.querySelector("input"); // On récupère l'input de chaque box
    let textError = b.querySelector(".error-txt"); // On récupère l'élément texte de chaque box

    if (element != null) // On vérifie que l'élément ne soit pas égal à null
    {
        // On ajoute un event listener sur chaque input qui exécute la fonction "checkInput" lorsque l'input perd le focus
        element.addEventListener("focusout", e =>
        {
            checkInput(dataId, element, textError)
        });
    }

    else
    {
        element = b.querySelector("textarea");

        // On ajoute un event listener sur chaque input qui exécute la fonction "checkInput" lorsque l'input perd le focus
        element.addEventListener("focusout", e =>
        {
            checkTextArea(b, element)
        });
    }
})

// Permet de vérifier le champ "Message"
function checkTextArea(textAreaBox, textArea)
{
    // Erreur textArea
    const messageError = textAreaBox.querySelector("p"); // On récupère le message d'erreur

    if (textArea.value.length < 10)
    {
        isValid = false; // On change la valeur de isValid pour dire que l'entièreté du formulaire n'est pas valide

        messageError.textContent = ""; // On reset pour éviter que les "X" se multiplient

        textArea.style.border = "1px solid red" // On change la couleur des bordures du textarea

        // Création du "X"
        const i = document.createElement("i"); // On crée un élément "i"
        i.className = "fa-solid fa-x"; // On attribut les classes à notre élément "X"
        messageError.appendChild(i); // On ajoute notre élément "X" dans notre "p"
    }

    else
    {
        messageError.textContent = ""; // On retire le "X" si il est présent
        textArea.style.border = "1px solid green"; // On change la couleur de la bordure
    }
}




// Fonction qui vérifie 1 input à la fois
function checkInput(id, element, txtError)
{
    // On boucle l'ensemble des clés et valeurs de l'objet contenant les regex
    Object.entries(obj).forEach(entry =>
    {
        // On stock les clé et les valeurs dans des variables
        const [key, value] = entry;

        // On vérifie que la clé est égal à l'id de la box pour récupérer le regex correspondant au champ de texte
        if (key === id)
        {
            // On vérifie que la valeur de l'input match avec le Regex
            if(value.regex.test(element.value))
            {
                element.style.border = "1px solid green"; // On met les bords de l'input en vert

                txtError.textContent = ""; // On reset le contenu du message d'erreur dans le cas ou il y aurait un "X"
            }

            else
            {
                isValid = false; // On change la valeur de isValid pour dire que l'entièreté du formulaire n'est plus valide

                txtError.textContent = ""; // On reset le content pour ne pas multiplier les "X"
                element.style.border = "1px solid red"; // On met les bords en rouge

                // Création du "X"
                const i = document.createElement("i"); // On crée un élément "i"
                i.className = "fa-solid fa-x"; // On attribut les classes à notre élément "X"
                txtError.appendChild(i); // On ajoute notre élément "X" dans notre "p"
            }
        }
    })
}

// Fonction qui test tous le formulaire
function checkAllForm()
{
    // On reset la valeur de la variable
    isValid = true;

    // Boucle for qui exécute une actions pour toutes les boites
    box.forEach(e =>
    {
        checkInput(e.getAttribute("data-id"), e.querySelector("input"), e.querySelector("p")); // On test chaque input
    })

    checkTextArea(textAreaBox, textArea); // On vérifie le champ "Message"

    globalErrorMessage.style.opacity = "1" // On fait apparaître le message d'erreur
    globalErrorMessageContainer.style.display = "flex"; // On change le display de la boite en flex

    // On vérifie si le formulaire est valide
    if (isValid)
    {
        globalErrorMessage.style.backgroundColor = "green"; // On change la couleur du message global
        globalErrorMessage.textContent = "Formulaire validé"; // On change le texte du message global
        globalErrorMessage.style.whiteSpace = "nowrap"; // On retire le whitespace
        globalErrorMessage.style.width = "fit-content"; // On définit la largeur du message
        textArea.style.border = "1px solid green"; // On change la couleur des bordures du textarea
    }

    else
    {
        globalErrorMessage.textContent = "Veuillez remplir les champs du formulaire correctement !"; // On change la valeur
        globalErrorMessage.style.whiteSpace = "normal"; // On ajoute le whitespace
        globalErrorMessage.style.width = "80%"; // On définit la largeur du message
        globalErrorMessage.style.backgroundColor = "#ff6d6d"; // On change la couleur de fond du message global
    }
}




// -------------------- CONTACT PAGE -------------------- //

// Fonction qui permet d'afficher/cacher la page de contact
function contactPageHandler()
{
    // On stock la valeur de l'attribut "data-state"
    let state = contactPage.getAttribute("data-state")

    // On vérifie si le menu déroulant mobile est ouvert
    if (navigationDropDown.getAttribute("data-state") === "opened")
    {
        // On ferme le menu
        navigationDropDown.setAttribute("data-state", "closed")
    }

    // On vérifie si la page de contact est ouverte ou fermée
    if (state === "close")
    {
        contactPage.setAttribute("data-state", "open") // On ouvre la page de contact
        document.body.style.overflowY = "hidden"; // On désactive le scroll verticale
    }

    else
    {
        contactPage.setAttribute("data-state", "close") // On ferme la page de contact
        document.body.style.overflowY = "visible"; // On active le scroll verticale

    }
}




// -------------------- TEXT APPEAR -------------------- //

// Fonction qui fait apparaître du texte au chagement de la page
function textAppear()
{
    let count = 0; // On définit une variable compteur

    // Variable qui contient le texte
    const txt = "Un développeur web est un professionnel spécialisé dans la création et la maintenance de sites web. Les tâches d'un développeur web peuvent inclure la conception de la structure d'un site web, l'écriture du code pour construire des pages web et des fonctionnalités interactives, la gestion de bases de données et la mise en place de mesures de sécurité. Les développeurs web peuvent travailler pour des entreprises dans tous les secteurs d'activité, ou ils peuvent être des travailleurs indépendants."

    // Variable qui contient un tableau avec chaque mot de la variable "txt"
    const array = txt.split(" ")

    // On crée un interval toutes les 90 millisecondes
    let interval = setInterval(e =>
    {
        // On vérifie si le compteur à atteint le dernier emplacement du tableau
        if (count === array.length)
        {
            clearInterval(interval) // On supprime l'interval
        }

        // Sinon
        else
        {
            textAppearElement.textContent += array[count] + " "; // On ajoute un mot du tableau
            count++; // On incrémente le compteur
        }
    }, 90)
}



// -------------------- SLIDER -------------------- //

// Bouton de pause
autoSliderController.addEventListener("click", e =>
{
    if (sliderRunning) // On vérifie si le slider est actif
    {
        stopAutoSlide(); // On arrête le slider
        sliderRunning = false; // On passe la variable de vérification sur false
    }

    else
    {
        autoSlide(); // On lance le slider
        sliderRunning = true; // On passe la variable de vérification sur true
    }
})

function autoSlide() // Fonction qui lance l'autoslide
{
    // On vérifie que l'utilisateur sois sur mobile
    if (screen.width <= 425)
    {
        intervalID = setInterval(() => nextImage(), 2000) // On crée un interval qui exécute la fonction nextImage toutes les 2s
        if (!sliderRunning)
        {
            autoSliderController.className = "fa-solid fa-pause";
        }
    }
}

function stopAutoSlide() // Fonction qui arrête l'autoslide
{
    clearInterval(intervalID); // Supprime l'interval

    // On vérifie si l'autoslider est actif
    if (sliderRunning)
    {
        // On modifie l'icône
        autoSliderController.className = "fa-solid fa-play";
    }
}


function resetAutoSlideTimer() // Fonction qui reset le timer lorsque l'utilisateur passe à l'image suivante
{
    clearInterval(intervalID); // Supprime l'interval
    autoSlide(); // Relance l'autoslide
}


function nextImage() // Fonction qui passe à l'image suivante
{
    // On incrémente l'index des images de 1
    imageIndex++;

    // On vérifie que l'image index n'est pas dépasser le nombre max d'images
    imageIndex = imageIndex === maxImages / 2 ? 0 : imageIndex;

    // On translate l'ensemble du carousel
    mobileCarousel.style.transform = 'translate(-'+imageIndex * 100+'%)';

    // On vérifie que l'autoslider soit actif pour reset le timer
    if (sliderRunning)
    {
        // Reset le timer
        resetAutoSlideTimer();
    }
}

function previousImage() // Fonction qui passe à l'image suivante
{
    // On retire 1 à l'index des images
    imageIndex--;

    // On vérifie que l'image index ne soit pas en dessous de -1
    imageIndex = imageIndex < 0 ? maxImages / 2 - 1 : imageIndex;

    // On translate l'ensemble du carousel
    mobileCarousel.style.transform = 'translate(-'+imageIndex * 100+'%)';

    // On vérifie que l'autoslider soit actif pour reset le timer
    if (sliderRunning)
    {
        // Reset le timer
        resetAutoSlideTimer();
    }
}


// -------------------- SKILL BAR -------------------- //

// Fonction qui permet d'automatiser le remplissage de la barre des compétences
function fillLoadingSkills()
{
    // On boucle sur toutes les éléments fillbar
    fillBar.forEach(e =>
    {
        // On récupère le contenu de l'élément ".tooltip" et on l'applique comme largeur à l'élément de remplissage
        e.style.width = e.querySelector(".tooltip").textContent;
    })
}



// -------------------- START -------------------- //

// Exécute les fonctions lors du lancement de la page
function init()
{
    fillLoadingSkills(); // On remplit les barres de chargement
    autoSlide(); // On lance l'autoslider

    // On vérifie que la taille de l'écran soit supérieur à 768px car en dessous la vidéo d'intro ne s'affiche pas
    if (screen.width < 768)
    {
        textAppear(); // On affiche le texte sur le hero banner
    }
}

init(); // On appelle la fonction init qui execute toutes les fonctions au lancement