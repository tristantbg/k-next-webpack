import App from '../../index';
import Pagination from '../pagination';
import RangeTime from '../range-time';
import Links from '../links';
import Component from 'gia/Component';
import InfiniteScroll from 'infinite-scroll'
import 'whatwg-fetch';
export default class Search extends Component {
    constructor(element) {
        super(element);
        this.container = false
        this.ref = {
            clear: null,
            list: []
        };
        this.options = {
            mode: 'normal'
        };
    }
    mount() {
        this.container = this.element.parentNode
        this.targetMode()
    }
    targetMode() {
        if (this.options.mode == 'replace') {
            this.links = this.element.querySelectorAll('a')
            this.links.forEach(l => {
                l.setAttribute('data-no-swup', true)
                l.addEventListener('click', e => this.loadLink(e))
            })
        }
    }
    loadLink(e) {
        let element, href;
        const _this = this;
        if (typeof e !== 'string') {
            e.preventDefault();
            element = e.currentTarget;
            href = element.href;
        } else {
            href = e
        }
        const query = _this.getParameterByName('query')
        if (query) {
          href += '?query=' + _this.getParameterByName('query')
        } else if(App.currentSearch) {
          href += '?query=' + App.currentSearch
        }

        document.body.classList.add('is-loading')
        fetch(href).then(function(response) {
            return response.text();
        }).then(function(body) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(body, "text/html");
            const container = doc.querySelector(`#${_this.container.id}`);
            if (container) {
                history.replaceState(null, doc.title, href);
                document.title = doc.title;
                _this.insertHTML(container);
            } else {
                document.body.classList.remove('is-loading')
            }
        });
    }
    insertHTML(newContainer) {
        if (this.container) {
            Pagination.destroy()
            this.container.querySelector("[g-component=Search]").innerHTML = newContainer.querySelector("[g-component=Search]").innerHTML;
            this.container.querySelector(".results").innerHTML = newContainer.querySelector(".results").innerHTML
            Links.init()
            this.targetMode()
            RangeTime.init()
            Pagination.init()
            document.body.classList.remove('is-loading')
        }
    }
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}
