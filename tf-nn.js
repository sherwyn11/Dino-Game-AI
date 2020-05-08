class NeuralNetwork{

    constructor(inp, hid, out, d){

        if(inp instanceof tf.Sequential){
            this.model = inp
            this.input_nodes = hid;
            this.hidden_nodes = out;
            this.output_nodes = d;
        }else{
            this.input_nodes = inp;
            this.hidden_nodes = hid;
            this.output_nodes = out;
            this.model = this.createModel();
        }
    }

    dispose(){
        this.model.dispose();
    }

    createModel(){
        const model = tf.sequential();
        const hidden = tf.layers.dense({units: this.hidden_nodes, inputShape: [this.input_nodes], activation: 'relu'});
        model.add(hidden);
        const output = tf.layers.dense({units: this.output_nodes, activation: 'softmax'});
        model.add(output);
        return model;
    }

    predict(inputs){
        return tf.tidy(() => {
            const inps = tf.tensor2d([inputs]);
            const ops = this.model.predict(inps);
            const outputs = ops.dataSync();
            return outputs;
        });

    }

    copy(){
        console.log('Copying...');
        return tf.tidy(() => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            const weightCopies = [];
            for (var i = 0; i < weights.length; i++){
                weightCopies[i] = weights[i].clone();
            }
            modelCopy.setWeights(weightCopies);
            return new NeuralNetwork(modelCopy, this.input_nodes, this.hidden_nodes, this.output_nodes);
        });
    }

    mutate(mutationRate){
        console.log('Mutation...');
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for(let i = 0; i < weights.length; i++){
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for(let j = 0; j < values.length; j++){
                    if(random(1) < mutationRate){
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });

    }

}