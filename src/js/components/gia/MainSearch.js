import App from '../../index';
import 'whatwg-fetch';
import RangeTime from '../range-time';
import Links from '../links';
import Menu from '../Menu';
import GiaComponents from '../GiaComponents';
import Component from 'gia/Component';
import eventbus from 'gia/eventbus';
import debounce from 'lodash/debounce';
import InfiniteScroll from 'infinite-scroll'
export default class MainSearch extends Component {
    constructor(element) {
        super(element);
        this.opened = false
        this.currentSearch = null
        this.overlay = false
        this.ref = {
            input: false
        };
        this.options = {
            selector: '#search-results',
            minLength: 3
        };
    }
    mount() {
        this.setResultsContainer()
        this.ref.input.addEventListener('keyup', debounce(this.search.bind(this), 400))
        this.ref.input.addEventListener('focus', this.focus.bind(this))
        this.ref.input.addEventListener('blur', this.blur.bind(this))
        if (this.overlay) this.overlay.addEventListener('click', _ => {
            this.resetSearch()
            Menu.state('primary')
        })
        eventbus.on('resetSearch', this.resetSearch.bind(this));
        eventbus.on('clearSearch', this.clearSearch.bind(this));
    }
    setResultsContainer() {
        const resultsContainer = document.getElementById('search-results')
        if (resultsContainer) {
            this.resultsContainer = resultsContainer
        } else {
            this.resultsContainer = document.createElement('section')
            this.resultsContainer.className = 'search-results section section--blocks-items'
            this.element.append(this.resultsContainer)
            // this.overlay = document.createElement('div')
            // this.overlay.className = 'overlay'
            // this.element.append(this.overlay)
        }
    }
    setUrlParameter(key, value, url) {
        if (!url) url = window.location.href;
        var key = encodeURIComponent(key),
            value = encodeURIComponent(value),
            urlQueryString;
        var baseUrl = url.split('?')[0],
            newParam = key + '=' + value,
            params = '?' + newParam;
        if (url.split('?')[1] === undefined) { // if there are no query strings, make urlQueryString empty
            urlQueryString = '';
        } else {
            urlQueryString = '?' + url.split('?')[1];
        }
        // If the "search" string exists, then build params from it
        if (urlQueryString) {
            var updateRegex = new RegExp('([\?&])' + key + '[^&]*');
            var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');
            if (value === undefined || value === null || value === '') { // Remove param if value is empty
                params = urlQueryString.replace(removeRegex, "$1");
                params = params.replace(/[&;]$/, "");
            } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
                params = urlQueryString.replace(updateRegex, "$1" + newParam);
            } else if (urlQueryString == '') { // If there are no query strings
                params = '?' + newParam;
            } else { // Otherwise, add it to end of query string
                params = urlQueryString + '&' + newParam;
            }
        }
        // no parameter was set so we don't need the question mark
        params = params === '?' ? '' : params;
        history.replaceState(null, document.title, baseUrl + params);
    }
    loadResults(query) {
        if (this.currentSearch === query) return
        const _this = this;
        let href = this.element.action + '?query=' + query
        this.currentSearch = query
        fetch(href).then(function(response) {
            return response.text();
        }).then(function(body) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(body, "text/html");
            const container = doc.querySelector(_this.options.selector);
            if (container) {
                if (App.pageType == 'search') {
                    history.replaceState(null, doc.title, href);
                } else {
                    // _this.setUrlParameter('query', query)
                    App.currentSearch = _this.currentSearch
                }
                document.title = doc.title;
                _this.insertHTML(container);
                _this.open()
            }
        });
    }
    insertHTML(newContainer) {
        if (newContainer) {
            this.resultsContainer.innerHTML = '<div id="search-results" class="row inner">' + newContainer.innerHTML + '</div>'
            Links.init()
            RangeTime.init()
            GiaComponents.load(this.resultsContainer)
            if (App.pageType != 'search') this.pagination()
        }
    }
    focus() {
        this.element.classList.add('focus')
        TweenLite.to('#menu-overlay', 0.4, {
            autoAlpha: 1
        })
    }
    blur() {
        this.element.classList.remove('focus')
        if (this.opened || App.isMobile && !Menu.opened) {
            return
        } else {
            TweenLite.to('#menu-overlay', 0.4, {
                autoAlpha: 0
            })
        }
    }
    toggle() {
        if (this.opened) {
            this.close()
        } else {
            this.open()
        }
    }
    // open() {
    //     if (this.opened) return
    //     TweenLite.set(this.resultsContainer, {
    //         height: 'auto',
    //         autoAlpha: 1
    //     })
    //     TweenLite.from(this.resultsContainer, 0.8, {
    //         height: 0,
    //         ease: Expo.easeOut,
    //         onStart: _ => {
    //             this.element.classList.add('opened')
    //             this.opened = true
    //         }
    //     })
    // }
    // close() {
    //     if (!this.opened) return
    //     TweenLite.to(this.resultsContainer, 0.6, {
    //         height: 0,
    //         ease: Expo.easeOut,
    //         onStart: _ => {
    //             this.element.classList.remove('opened')
    //             this.opened = false
    //         },
    //         onComplete: _ => {
    //             this.ref.input.value = ''
    //             this.resultsContainer.innerHTML = ''
    //             this.currentSearch = ''
    //             this.resultsContainer.style.visibility = 'hidden'
    //         }
    //     })
    // }
    open() {
        if (this.opened) return
        TweenLite.set(this.resultsContainer, {
            height: 'auto',
            autoAlpha: 1
        })
        this.element.classList.add('opened')
        this.element.classList.add('searching')
        TweenLite.to('#menu-overlay', 0.4, {
            autoAlpha: 1
        })
        this.opened = true
    }
    close() {
        if (!this.opened) return
        this.ref.input.value = ''
        this.resultsContainer.innerHTML = ''
        this.currentSearch = ''
        this.resultsContainer.style.visibility = 'hidden'
        this.element.classList.remove('opened')
        this.element.classList.remove('searching')
        if (App.isMobile && !Menu.opened) {
            return
        } else {
            TweenLite.to('#menu-overlay', 0.4, {
                autoAlpha: 0
            })
        }
        this.opened = false
    }
    search() {
        if (this.ref.input.value == '') {
            this.resetSearch()
        } else if (this.ref.input.value.length < this.options.minLength) {
            return
        } else {
            this.loadResults(this.ref.input.value)
        }
    }
    resetSearch() {
        this.close()
        if (App.pageType == 'search') this.ref.input.focus()
    }
    clearSearch() {
        if (this.ref.input.value == '') {
            Menu.state('primary')
            this.resetSearch()
        } else {
            this.close()
            this.ref.input.focus()
        }
    }
    pagination() {
        const container = this.resultsContainer.querySelector('.section--blocks-items .items.grid-items')
        const pagination = this.resultsContainer.querySelector('#pagination')
        if (container && pagination) {
            this.infiniteScroll = new InfiniteScroll(container, {
                path: '#pagination .next',
                append: '.block.grid-item',
                history: false,
                elementScroll: '#search .search-results',
                // history: ['news', 'exhibitions'].includes(App.pageType) ? 'replace' : false,
                hideNav: "#pagination",
                prefill: false,
                scrollThreshold: App.height,
                // status: '.ajax-loading',
                debug: false
            })
            this.infiniteScroll.on('append', function(response, path, items) {
                RangeTime.init()
                Links.init()
            });
        } else {
            this.infiniteScroll = null
        }
    }
}
