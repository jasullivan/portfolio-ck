const wrapper = document.querySelector('.wrapper');
const projectColumnContainer = document.querySelector('.project-columns');
const projectColumns = document.querySelectorAll('.project-col');
const closeButtons = document.querySelectorAll('.project-col__close-button');
const mobCloseButton = document.querySelector('.bio-section__close-button');
const infoButton = document.querySelector('.bio-info__button');
const infoContent = document.querySelector('.bio-info__content');
const infoContactIcons = document.querySelector('.bio-info__contact-icons');
// const mobFooterContacts = document.querySelector('.footer-contacts');

// *********************************************
// ****************** functions ****************
const openProjectCommonTasks = (col) => {
    col.classList.remove('project-col--regular');
    setTimeout(() => {
        col.classList.remove('project-col--expand');
        col.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
    }, 300);
    col.querySelector('.project-col__svg').classList.remove('project-col__svg--hold');
    col.querySelector('.project-col__close-button').classList.add('project-col__close-button--show');
}
const closeMobInfo = () => {
    if(infoContent.classList.contains('bio-info__content--show')) {
        infoContent.classList.remove('bio-info__content--show');
        infoButton.classList.remove('bio-info__button--open');
        infoContactIcons.classList.remove('bio-info__contact-icons--show');
    }
}
const addOuterContainerClasses = () => {
    wrapper.classList.add('open');
    projectColumnContainer.classList.add('project-columns--open');
}
const removeOuterContainerClasses = () => {
    wrapper.classList.remove('open');
    projectColumnContainer.classList.remove('project-columns--open');
    // document.querySelector('.footer-contacts').classList.remove('footer-contacts--hide');
}
const closeProjectCommonTasks = (cols) => {
    cols.classList.remove('project-col--closed');
    cols.classList.remove('project-col--scroll');
    cols.classList.remove('project-col--open');
    cols.classList.add('project-col--regular');
    cols.scroll({
        top: 0,
        behavior: 'smooth'
    })
}
const projectExpand = (e) => {
    const eTargetParent = e.target.parentElement;
    eTargetParent.classList.add('project-col--expand');
    eTargetParent.querySelector('.project-col__info-button').classList.remove('project-col__info-button--hidden');
    eTargetParent.querySelector('.project-col__project-title').classList.add('project-col__project-title--show');
}
const projectContract = (e) => {
    const eTargetParent = e.target.parentElement;
    eTargetParent.classList.remove('project-col--expand');
    eTargetParent.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden');
    if(!eTargetParent.classList.contains('project-col--open')) {
        eTargetParent.querySelector('.project-col__project-title').classList.remove('project-col__project-title--show');
    }
}
// ****************** functions *****************
// **********************************************

// *****************************************************
// **** expand and contract desktop project columns ****
const hoverFunctionality = (hoverType) => {
    projectColumnContainer.addEventListener(hoverType, e => {
        if(e.target.matches('.project-col__bg-colour') && e.target.parentElement.classList.contains('project-col--closed')) {
            hoverType === "mouseover" 
                ? e.target.parentElement.querySelector('.project-col__svg').classList.add('openIcon') 
                : e.target.parentElement.querySelector('.project-col__svg').classList.remove('openIcon')

        } else if(e.target.matches('.project-col__bg-colour')) { 
            const colsClosed = !e.target.parentElement.classList.contains('project-col--expand') && !e.target.parentElement.classList.contains('project-col--open');
            colsClosed ? projectExpand(e) : projectContract(e);
        }
    })
}
hoverFunctionality('mouseover');
hoverFunctionality('mouseout');
// **** expand and contract desktop project columns ends ****
// **********************************************************

// *********************************************
// ************** mob info button **************
infoButton.addEventListener('click', e => {
    if(e.target.parentElement.classList.contains('bio-info__button')) {
        !e.target.parentElement.classList.contains('bio-info__button--open') 
            ? e.target.parentElement.classList.add('bio-info__button--open') 
            : e.target.parentElement.classList.remove('bio-info__button--open')  
        infoContent.classList.contains('bio-info__content--show') 
            ? infoContent.classList.remove('bio-info__content--show')
            : infoContent.classList.add('bio-info__content--show') 
        infoContactIcons.classList.contains('bio-info__contact-icons--show') 
            ? infoContactIcons.classList.remove('bio-info__contact-icons--show')
            : infoContactIcons.classList.add('bio-info__contact-icons--show') 
    }
});
// ************** mob info button ends **************
// **************************************************

// *********************************************
// ************** click functions **************
projectColumnContainer.addEventListener('click', e => {
    if(e.target.matches('.project-col__bg-colour')) { 
        const projectColumn = e.target.parentElement;
        const open = projectColumn.classList.contains('project-col--open');
        const closed = projectColumn.classList.contains('project-col--closed');
        // ******** desktop *********
        if(!open && mediaQ.matches){
            // when a closed desktop column is clicked
            if(closed) {
                projectColumnContainer.classList.add('project-columns--open');
                projectColumns.forEach(col => {
                    col.classList.remove('project-col--scroll');
                    col.classList.add('project-col--regular');
                    col.querySelector('.project-col__project-title').classList.remove('project-col__project-title--show');
                    col.querySelector('.project-col__close-button').classList.remove('project-col__close-button--show');
                    col.scroll({ top: 0, behavior: 'smooth' });
                    col.querySelector('.project-col__svg').classList.add('project-col__svg--hold');
                });
                projectColumn.querySelector('.project-col__svg').classList.remove('openIcon') ;
            }
            // add '--show' to mobCloseButton so visible if change view to mobile
            mobCloseButton.classList.add('bio-section__close-button--show');
            addOuterContainerClasses();
            projectColumns.forEach(col => {
                col.classList.remove('project-col--open');
                col.classList.add('project-col--closed');
                // col.classList.add('project-col--hold');
            });
            projectColumn.classList.remove('project-col--closed');
            projectColumn.classList.add('project-col--open');
            openProjectCommonTasks(projectColumn);
            // projectColumn.classList.remove('project-col--hold');
            setTimeout(() => {
                projectColumn.classList.add('project-col--scroll');
                projectColumn.querySelector('.project-col__project-title').classList.add('project-col__project-title--show')
            }, 750);
        // ******** mobile *********
        } else if (!open && !mediaQ.matches){
            addOuterContainerClasses();
            projectColumns.forEach(col => {
                col.classList.add('project-col--closed');
                // col.classList.add('project-col--hold');
            });
            projectColumn.classList.remove('project-col--closed');
            mobCloseButton.classList.add('bio-section__close-button--show');
            // mobFooterContacts.classList.add('footer-contacts--hide');
            closeMobInfo()
            openProjectCommonTasks(projectColumn);
            // projectColumn.classList.remove('project-col--hold');
            setTimeout(() => {
                projectColumn.classList.add('project-col--open');
                projectColumn.querySelector('.project-col__project-title').classList.add('project-col__project-title--show');
            }, 600);
            setTimeout(() => {
                projectColumn.classList.add('project-col--scroll');
            }, 750);
        }
    } 
})
// ************** click functions end **************
// *************************************************

// *********************************************
// ************** close buttons ****************
closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', e => {
        const projectColumn = e.target.parentElement;
        removeOuterContainerClasses();
        closeMobInfo();
        mobCloseButton.classList.remove('bio-section__close-button--show');
        projectColumn.querySelector('.project-col__close-button').classList.remove('project-col__close-button--show');

        projectColumns.forEach(col => {
            closeProjectCommonTasks(col);

            // created issues for firefox 
            // 'project-col--hold' prevents hover interaction as columns reset on desktop after closing
            // setTimeout(() => { 
            //     col.classList.add('project-col--hold');
            // }, 100);
            // created issues  for firefox 

            col.querySelector('.project-col__project-title').classList.remove('project-col__project-title--show');

            setTimeout(() => { 
                col.querySelector('.project-col__svg').classList.add('project-col__svg--hold');
            }, 300);
            // setTimeout(() => { 
            //     col.classList.remove('project-col--hold');
            // }, 500);
        })
    })
})
// closeButtons.forEach(closeButton => {
//     closeButton.addEventListener('click', e => {
//         const projectColumn = e.target.parentElement;
//         removeOuterContainerClasses();
//         closeMobInfo();
//         mobCloseButton.classList.remove('bio-section__close-button--show');
//         projectColumn.querySelector('.project-col__close-button').classList.remove('project-col__close-button--show');
//         projectColumns.forEach(col => {
//             closeProjectCommonTasks(col);
            // 'project-col--hold' prevents hover interaction as columns reset on desktop after closing
//             col.classList.add('project-col--hold');
//             col.querySelector('.project-col__project-title').classList.remove('project-col__project-title--show')
//             setTimeout(() => { 
//                 col.querySelector('.project-col__svg').classList.add('project-col__svg--hold');
//             }, 300);
//             setTimeout(() => { 
//                 col.classList.remove('project-col--hold');
//             }, 500);
//         })
//     })
// })
// mobile close button
mobCloseButton.addEventListener('click', e => {
    if(e.target.matches('.bio-section__close-button img')) { 
        removeOuterContainerClasses();
        closeMobInfo();
        e.target.parentElement.classList.remove('bio-section__close-button--show');
        closeButtons.forEach(closeButton => {
            closeButton.classList.remove('project-col__close-button--show');
        })
        projectColumns.forEach(col => {
            closeProjectCommonTasks(col);
            setTimeout(() => { 
                col.querySelector('.project-col__project-title').classList.remove('project-col__project-title--show')
            }, 1000);
        })
    }
})
// mobile close button ends
// ************** close buttons end **************
// ***********************************************

var mediaQ = window.matchMedia("(min-width: 1000px)") 