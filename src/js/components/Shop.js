const Shop = {
  scriptURL: 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js',
  init: _ => {
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        Shop.ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    function loadScript() {
      var script = document.createElement('script');
      script.async = true;
      script.src = Shop.scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = Shop.ShopifyBuyInit;
    }
  },
  ShopifyBuyInit: _ => {
    Shop.client = ShopifyBuy.buildClient({
      domain: 'xxx',
      storefrontAccessToken: 'xxx',
      appId: '6',
    });
    const items = document.querySelectorAll('[data-shop]')
    items.forEach(el => {
      Shop.createButton(el.dataset.shop)
    })
  },
  createButton: id => {
    const node = document.getElementById('product-component-' + id)
    ShopifyBuy.UI.onReady(Shop.client).then(function(ui) {
      ui.createComponent('product', {
        id: [id],
        node: node,
        moneyFormat: 'Sfr. {{amount_with_comma_separator}}',
        options: {
          "product": {
            iframe: false,
            variantId: "all",
            events: {
              afterRender: _ => {}
            },
            text: {
              button: 'Add to cart'
            },
            "contents": {
              "img": true,
              "title": true,
              "imgWithCarousel": false,
              "variantTitle": false,
              "description": true,
              "buttonWithQuantity": false,
              "quantity": false
            },
            "styles": {
              "product": {
                "@media (min-width: 601px)": {
                  "max-width": "calc(25% - 20px)",
                  "margin-left": "20px",
                  "margin-bottom": "50px"
                }
              },
              "button": {
                "color": "#fff",
                "background": "transparent",
                ":hover": {
                  "color": "#fff",
                  "background": "transparent",
                }
              },
              "price": {
                "color": "#fff",
                "fontSize": "15px",
              }
            }
          },
          "cart": {
            iframe: true,
            popup: true,
            "contents": {
              "button": true
            },
            "styles": {
              "background-color": "#000",
              "color": "#fff",
              "footer": {
                "background-color": "#000",
                "color": "#fff"
              },
              "header": {
                "background-color": "#000",
                "color": "#fff"
              },
              "cartScroll": {
                "background-color": "#000",
                "color": "#fff"
              },
              "button": {
                "background-color": "#000",
                "color": "#fff",
                "border": "1px solid rgba(255,255,255,0.3)",
                ":hover": {
                  "background-color": "#000",
                  "color": "#fff",
                  "border": "1px solid rgba(255,255,255,0.3)",
                }
              }
            }
          },
          "lineItem": {
            "styles": {
              "quantity": {
                "filter": "invert(1)"
              }
            }
          },
          "toggle": {
            iframe: false,
            "contents": {
              "title": true,
              "icon": false
            },
            "text": {
              title: "Cart"
            },
            "styles": {
              "background-color": "#ffffff",
              "color": "#000000"
            }
          },
          "modalProduct": {
            "contents": {
              "img": false,
              "imgWithCarousel": true,
              "variantTitle": false,
              "buttonWithQuantity": true,
              "button": false,
              "quantity": false
            },
            "styles": {
              "product": {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0px",
                  "margin-bottom": "0px"
                }
              }
            }
          },
          "productSet": {
            "styles": {
              "products": {
                "@media (min-width: 601px)": {
                  "margin-left": "-20px"
                }
              }
            }
          }
        }
      });
    });
  }
}

export default Shop;
