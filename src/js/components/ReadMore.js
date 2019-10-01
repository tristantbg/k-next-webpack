import { TweenLite } from 'gsap'
const ReadMore = {
    options: {
        target: '.read-more',
        numOfWords: 90,
        toggle: true,
        speed: 1,
        moreLink: 'Read more',
        lessLink: 'Close',
        linkClass: 'read-more-link',
        containerClass: 'read-more-container'
    },
    helpers: {
        extendObj: function() {
            for (var i = 1, l = arguments.length; i < l; i++) {
                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        if (arguments[i][key] && arguments[i][key].constructor && arguments[i][key].constructor === Object) {
                            arguments[0][key] = arguments[0][key] || {};
                            this.extendObj(arguments[0][key], arguments[i][key]);
                        } else {
                            arguments[0][key] = arguments[i][key];
                        }
                    }
                }
            }
            return arguments[0];
        }
    },
    // Return the number of words of string.
    countWords: function(str) {
        return str.split(/\s+/).length;
    },
    // Rturn string starting from first word untill number specified.
    generateTrimmed: function(str, wordsNum) {
        return str.split(/\s+/).slice(0, wordsNum).join(' ') + '...';
    },
    // Plugin Initialization
    init: function(options = ReadMore.options) {
        var defaults = {
            target: '',
            numOfWords: 50,
            toggle: true,
            speed: 1.3,
            moreLink: 'read more...',
            lessLink: 'read less',
            linkClass: 'rm-link',
            containerClass: false
        };
        options = ReadMore.helpers.extendObj({}, defaults, options);
        var target = document.querySelectorAll(options.target), // Get the node list of target elements specified by the user.
            targetLen = target.length, // Length of the targets node list.
            targetContent, // The initial text that is contained in the target element.
            trimmedTargetContent, // The final (trimmed) text.
            targetContentWords, // The number of words the initial text has.
            initArr = [], // Array to hold the initial text of each target element.
            trimmedArr = [], // Array to hold the final (trimmed) text of each target element.
            i, j, l, moreContainer, rmLink, moreLinkID, index, p;
        // Loop through all target elements
        for (i = 0; i < targetLen; i++) {
            p = target[i].querySelector('p');
            targetContent = p && ReadMore.countWords(p.innerHTML) == options.numOfWords ? p.innerHTML : target[i].innerHTML.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<p></p>'); // Get the initial text of each target element.
            targetContentWords = ReadMore.countWords(target[i].innerText); // Count the number of words the initial text has.
            trimmedTargetContent = ReadMore.generateTrimmed(targetContent, options.numOfWords); // Generate the trimmed version of the initial text.
            initArr.push(target[i].innerHTML); // Push the initial text to initArr.
            trimmedArr.push(trimmedTargetContent); // Push the trimmed text to trimmedArr.
            // Procceed only if the number of words specified by the user
            // is smaller than the number of words the target element has.
            if (options.numOfWords < targetContentWords - 1) {
                target[i].innerHTML = trimmedArr[i]; // Populate the target element with the trimmed version of text.
                // moreContainer = document.createElement('div'); // Create a div element to hold the More/Less link.
                // if (options.containerClass) {
                //     moreContainer.className = options.containerClass;
                // }
                // moreContainer.innerHTML = '<a id="rm-more_' + i + '"' // Create the More/Less link.
                //     + ' class="' + options.linkClass + '"' + ' style="cursor:pointer;" data-readmore="anchor">' + options.moreLink + '</a>';
                // target[i].parentNode.insertBefore(moreContainer, target[i].nextSibling); // Insert the More/Less link after the target element.
                rmLink = document.createElement('a');
                rmLink.id = 'rm-more_' + i;
                rmLink.className = options.linkClass;
                rmLink.style.cursor = 'pointer';
                rmLink.dataset.readmore = 'anchor';
                rmLink.innerHTML = options.moreLink;
                target[i].append(rmLink); // Insert the More/Less link after the target element.
            }
        }
        rmLink = document.querySelectorAll('[data-readmore="anchor"]'); // Reference the More/Less link.
        // Loop through all links and attach event listeners.
        for (j = 0, l = rmLink.length; j < l; j++) {
            rmLink[j].onclick = function() {
                moreLinkID = this.getAttribute('id'); // Get each link's unique identifier.
                index = moreLinkID.split('_')[1]; // Extract index number from each link's 'id'.
                // if (!helpers.classList.contains(this, 'less')) {
                if (this.getAttribute('data-clicked') !== 'true') {
                    var h = target[index].offsetHeight;
                    TweenLite.set(target[index], {
                        height: 'auto',
                        overflow: 'hidden',
                        innerHTML: initArr[index]
                    });
                    TweenLite.from(target[index], options.speed, {
                        height: h,
                        ease: Expo.easeOut
                    });
                    if (options.toggle !== false) {
                        this.innerHTML = options.lessLink;
                        this.setAttribute('data-clicked', true);
                    } else {
                        this.innerHTML = '';
                    }
                } else {
                    target[index].innerHTML = trimmedArr[index];
                    this.innerHTML = options.moreLink;
                    this.setAttribute('data-clicked', false);
                }
            };
        }
    }
};
export default ReadMore;
