const containerFlexProps = {
    overflow:{ label: 'overflow', options: ['auto', 'hidden', 'scroll']},
    flexDirection:{ label: 'flex-direction', options: ['row', 'row-reverse', 'column', 'column-reverse']},
    flexWrap: { label: 'flex-wrap', options: ['nowrap', 'wrap', 'wrap-reverse']},
    justifyContent: { label: 'justify-content', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']},
    alignItems: { label: 'align-items', options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch']},
    alignContent: { label: 'align-content', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']}
}

const childFlexProps = {
    grow:{ label: 'flex-grow', options: ['0', '1', '2', '3', '4', '5']},
    shrink: { label: 'flex-shrink', options: ['0', '1', '2', '3', '4', '5']},
    basis: { label: 'flex-basis', options: ['auto', '40px', '50px', '60px', '70px']},
    align: { label: 'align-self', options: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']},
}

const colors =  ['#E91E63', '#9C27B0', '#03A9F4', '#CDDC39', '#FFC107', '#4CAF50'];

const childSizeOptions = ['initial', '50px', 'random'];

const container = { width: 400, height: 200, overflow: '' }
Object.keys(containerFlexProps).forEach( prop => {
    container[prop] = ''
});

const children = [];

function buildChildren(num) {
    children.splice(0, children.length);
    for (let i = 0; i < num; i++) {
        children.push({ id: i + 1, width: '50px', height: '50px', color: colors[i % colors.length], grow: 0, shrink: 1, basis: 'auto', align: 'auto'});
    }
}
buildChildren(5);

const vm = new Vue({
    el: '#app',
    data: {
        colors,
        containerFlexProps,
        childFlexProps,
        container,
        children,
        childrenCount: children.length,
        childSizeOptions,
        childWidth: 1,
        childHeight: 1,
        selectChildren: [],
        state: { 
            itemCount: children.length,
        }
    },
    watch: {
        childrenCount: function (newValue, oldValue) {
            if (newValue === oldValue) return;
            this.selectChildren.splice(0, children.length);
            this.childWidth = 1;
            this.childHeight = 1;
            buildChildren(newValue);
        }
    },
    methods: {
        toggleContainerProp: function(prop, newValue) {
            if (container[prop] === newValue) {
                container[prop] = '';
            } else {
                container[prop] = newValue;
            }
        },
        setChildSize: function(prop) {
            let propName;
            if (prop === 'width') {
                propName = 'childWidth';
            } else {
                propName = 'childHeight';
            }
            this[propName] = (this[propName] + 1 ) % childSizeOptions.length;
            
            switch(this[propName]) {
                case 0:
                    this.children.forEach(child => { Object.assign(child, { [prop]: 'initial' }) });
                    break;
                case 1:
                    this.children.forEach(child => { Object.assign(child, { [prop]: '50px' }) });
                    break;
                case 2:
                    this.children.forEach(child => { Object.assign(child, { [prop]: (Math.round(Math.random() * 50) + 40) + 'px' }) });
                    break;
            }
        },
        selectChild: function(child) {
            if (child === 'ALL') {
                this.selectChildren.splice(0, children.length);
                this.children.forEach(child => { this.selectChildren.push(child); });
            } else if (child === 'NONE') {
                this.selectChildren.splice(0, children.length);
            } else if (child === 'Invert') {
                const newSelection = this.children.filter(child => { return this.selectChildren.indexOf(child) === -1; })
                this.selectChildren = newSelection;
            } else if (this.selectChildren.indexOf(child) === -1) {
                this.selectChildren.push(child);
            } else {
                this.selectChildren.splice(this.selectChildren.indexOf(child), 1);
            }
        },
        setChildProp: function(prop, value) {
            this.selectChildren.forEach(child => {
                child[prop] = value;
            });
        },
        childrenPropChecked: function(prop, value) {
            return this.selectChildren.length && this.selectChildren.every(child => {
                return (child[prop] == value);
            });
        }
    },
    components: {
      VueSlider: window['vue-slider-component']
    }
})