var sum_to_n_a = function(n) {
    let sum = 0;
    while (n > 0){
        sum += n
        n--;
    }

    return sum;
};

var sum_to_n_b = function(n) {
   return (n*(n+1))/2;
};

var sum_to_n_c = function(n) {
    let sum = n;
    if(n > 0) {
        sum += sum_to_n_c(n - 1);
    }

    return sum;

};

console.log('sum_a: ', sum_to_n_a(10));
console.log('sum_b: ', sum_to_n_b(10));
console.log('sum_c: ', sum_to_n_c(10));