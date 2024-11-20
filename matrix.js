class binaryMatrix {
    constructor() {
        this.tree = []
    }

    showRoot(){
        if(this.tree[0] == null){
            console.log("Árvore Vazia")
        }
        else {
            console.log(`A raiz dá arvore é ${this.tree[0][0]}`)
        }
    }

    insert(value){
        const node = [value, -1, -1] // define o nó como uma folha
        if(this.tree.length === 0){
            this.tree[0] = node; //nó é a raiz
        }
        else{
            this._insert(0, node);
        }
    }

    _insert(index, node){
        if (node[0] < this.tree[index][0]) {
            // Se o valor for menor, vai para a esquerda
            if (this.tree[index][1] === -1){
                // se o nó não possuir filho menor
                this.tree[this.tree.length] = node // insere novo filho no final da matriz
                this.tree[index][1] = this.tree.length -1; // atualiza o apontador
            }
            else {
                // se o nó possuir filho menor
                this._insert(this.tree[index][1], node);
            }
        } else {
            // Se o valor for maior ou igual, vai para a direita
            if (this.tree[index][2] === -1){
                // se o nó não possuir filho maior
                this.tree[this.tree.length] = node // insere novo filho no final da matriz
                this.tree[index][2] = this.tree.length -1; // atualiza o apontador
            }
            else {
                // se o nó possuir filho maior
                this._insert(this.tree[index][2], node);
            }
        }
    }

    remove(value){
        if(this.tree[0] == null){
            return "Empty Tree"
        } else {
            this._remove(0, value);
        }
    }

    _remove(index, value){
        const node = this.tree[index]
        if(value < node[0]){ //valor menor do que o nó
            this._remove(node[1], value) //lado esquerdo
        }
        else if (value > node[0]){ //valor maior do que o nó
            this._remove(node[2], value) //lado direito
        }
        else if (node[1] !== -1 && node[2] !== -1){ //valor igual (nó a ser excluido) más com filho em ambos os lados
            console.log(`nó apagado ${node}`)
            this.tree[index] = this.glue(node[1], this.tree[node[2]]) //substitui o nó pelo ponteiro a direita
            this.tree[node[2]] = null; //apaga o antigo ponteiro
        }
        else if (node[1] !== -1 || node[2] !== -1){ //nó com filho em apenas um lado
            if(node[1] === -1){ //filho a direita
                console.log(`nó apagado ${node}`)
                this.tree[index] = this.tree[node[2]]
                this.tree[node[2]] = null;
            } else { //filho a esquerda
                console.log(`nó apagado ${node}`)
                this.tree[index] = this.tree[node[1]]
                this.tree[node[1]] = null;
            }
        }
        else { //folha
            console.log(`nó apagado ${node}`)
            this.tree[index] = null;
        }
    }

    inOrder(node){
        if (node != null) {
           this.inOrder(this.tree[node[1]])
            console.log(node[0] + ' ')
            this.inOrder(this.tree[node[2]])
        }
    }

    postOrder(node){
        if (node != null) {
            this.postOrder(this.tree[node[1]])
            this.postOrder(this.tree[node[2]])
            console.log(node[0] + ' ')
        }
    }

    preOrder(node){
        if (node != null) {
            console.log(node[0] + ' ')
            this.preOrder(this.tree[node[1]])
            this.preOrder(this.tree[node[2]])
        }
}


    findMin(){
        if(this.tree[0] == null){
            return "Empty Tree"
        } else {
            return this._findMin(this.tree[0]);
        }
    }

    _findMin(node){ //encontra o menor valor da árvore
        return node[1] === -1 ? node[0] : this._findMin(this.tree[node[1]])
    }

    glue(index, node){
        if (node[1] === -1){ //nó substituto não possui filhos menores
            node[1] = index //indica o filho menor do nó deletado como filho deste
        }
        else {
            this._glue(index, node[1]) //nó possui filho menor
        }
        return node
    }

    _glue(index, indexLeaf){
        //procura a folha entre os menores
        let leaf = this.tree[indexLeaf]
        if (leaf[1] === -1){ //condição de parada
            leaf[1] = index
            this.tree[indexLeaf] = leaf;
        }
         else{
             this._glue(leaf[1]);
        }
    }
}

const arvore = new binaryMatrix();

arvore.insert(100)
arvore.insert(20)
arvore.insert(15)
arvore.insert(25)
arvore.insert(22)
arvore.insert(30)
arvore.insert(33)
arvore.insert(12)
console.table(arvore.tree)


console.log('\npre')
arvore.preOrder(arvore.tree[0])

console.log('\npost')
arvore.postOrder(arvore.tree[0])

console.log('\nin')
arvore.inOrder(arvore.tree[0])