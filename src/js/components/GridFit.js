import App from '../index.js'
import debounce from 'lodash/debounce'
import GiaComponents from './GiaComponents';
const GridFit = {
    mediasContainer: null,
    medias: null,
    options: {
        itemSelector: '.grid-item, section.block',
        margin: 15,
        itemsPerRow: 3,
        itemsPerRowMobile: 2
    },
    init: _ => {
        GridFit.finished = false
        GridFit.mediasContainer = document.querySelector('.grid')
        GridFit.options.container = GridFit.mediasContainer
        if (!GridFit.mediasContainer || App.pageType == 'exhibition' && App.isMobile) {
            // lazySizes.init();
            return;
        }
        GridFit.hide()
        GridFit.medias = GridFit.mediasContainer.querySelectorAll(GridFit.options.itemSelector)
        if (GridFit.medias.length >= GridFit.options.itemsPerRow) {
            GridFit.render(GridFit.options)
        } else {
            GridFit.show()
        }
        window.addEventListener('resize', debounce(GridFit.resize, 300), false)
    },
    resize: _ => {
        if (!GridFit.element) return
        App.sizeSet();
        if (GridFit.lastWidth === App.width) return
        GridFit.lastWidth = App.width
        // GridFit.element.destroy()
        GridFit.element.layout()
    },
    render: (options = { itemSelector: '.grid-item, .block' }) => {
        GridFit.element = GridFit.create(options)
        GridFit.mediasContainer.addEventListener('layoutComplete', e => {
            GridFit.show();
            GiaComponents.load(GridFit.mediasContainer)
            lazySizes.init();
        })
        setTimeout(function() {
            GridFit.lastWidth = App.width
            GridFit.element.layout()
            GridFit.interact()
        }, 100);
    },
    create: (options = {}) => {
        const grid = {
            options: options
        }
        GridFit.hide()
        grid.items = grid.options.container.querySelectorAll(grid.options.itemSelector)
        grid.chunk = (size, xs) => xs.reduce(
            (segments, _, index) => index % size === 0 ? [...segments, xs.slice(index, index + size)] : segments, [])
        grid.createRows = items => {
            const rows = []
            let row = []
            const itemsPerRow = App.isMobile ? grid.options.itemsPerRowMobile : grid.options.itemsPerRow
            let clear = false
            items.forEach(i => {
                row.push(i)
                if (i.dataset.ratio > 1) row.containsLandscape = true
                if (row.length > 1 && row.containsLandscape || row.length > 1 && i.dataset.ratio > 1) clear = true
                if (clear || row.length == itemsPerRow) {
                    rows.push(row)
                    row = []
                    clear = false
                }
            })
            return rows;
        }
        grid.layout = _ => {
            // const itemsPerRow = grid.chunk(grid.options.perRow, [...grid.items])
            if (grid.items.length > 0) {}
            const itemsPerRow = grid.createRows(grid.items)
            if (getComputedStyle(grid.items[0]).marginRight) grid.options.margin = Math.round(parseInt(getComputedStyle(grid.items[0]).marginRight), 10)
            const html = document.createElement('div')
            itemsPerRow.forEach(row => {
                const rowElement = document.createElement('div')
                rowElement.className = 'row'
                let childRatioSum = 0;
                row.forEach(i => {
                    const height = i.dataset.height
                    const width = i.dataset.width
                    if (height > 0) {
                        childRatioSum += width / height;
                    }
                })
                if (childRatioSum > 0) {
                    //all images are downloaded, calculate the container height
                    //(add a few pixels to makes sure we fill the whole width)
                    const containerHeight = (grid.options.container.offsetWidth / childRatioSum) + row.length;
                    row.forEach((i, itemIndex) => {
                        const height = i.dataset.height
                        const width = i.dataset.width
                        i.removeAttribute('style')
                        // i.style.height = containerHeight + 'px'
                        i.style.width = Math.round((width * (containerHeight / height))) + 'px'
                        i.style.marginBottom = (grid.options.margin * 2) + 'px'
                        i.style.marginRight = itemIndex !== (row.length - 1) ? grid.options.margin + 'px' : '0px'
                        rowElement.append(i)
                    })
                }
                html.append(rowElement)
            })
            // html.append(gutter)
            GridFit.mediasContainer.innerHTML = html.innerHTML
            const lazyImgs = GridFit.mediasContainer.querySelectorAll('img.lazy')
            lazyImgs.forEach(i => {
                i.classList.add('lazyload')
            })
            var event = new Event('layoutComplete')
            grid.options.container.dispatchEvent(event);
        }
        return grid
    },
    interact: _ => {
        // GridFit.medias.forEach(element => {
        //   element.addEventListener('mouseenter', () => {
        //     GridFit.description.show(element)
        //   })
        //   element.addEventListener('mouseleave', () => {
        //     GridFit.description.clear()
        //   })
        // });
    },
    show: _ => {
        GridFit.mediasContainer.style.opacity = 1
        GridFit.finished = true
    },
    hide: _ => {
        GridFit.mediasContainer.style.opacity = 0
    }
};
export default GridFit;
