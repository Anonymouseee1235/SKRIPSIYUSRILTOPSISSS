% ========================================================
% FUZZY TOPSIS CALCULATION - CONVEYOR BAGGING (PT. ABC)
% Author: Yusril Alfafa
% ========================================================

clear; clc;

X = [
    6 7 4;
   10 2 5;
    7 6 2;
    7 5 2;
    6 4 3;
    5 5 5
];

W = [0.63138, 0.26179, 0.10683];

[m, n] = size(X);
R = zeros(m, n);
for j = 1:n
    R(:, j) = X(:, j) / sqrt(sum(X(:, j).^2));
end

V = R .* W;
A_pos = max(V);
A_neg = min(V);

D_pos = zeros(m, 1);
D_neg = zeros(m, 1);
for i = 1:m
    D_pos(i) = sqrt(sum((V(i, :) - A_pos).^2));
    D_neg(i) = sqrt(sum((V(i, :) - A_neg).^2));
end

CC = D_neg ./ (D_pos + D_neg);

Components = {'Drive & Tail Pulley'; 'Gearbox'; 'Photo Sensor'; 'Belt Conveyor'; 'Sprocket'; 'Bearing'};
T = table(Components, CC, 'VariableNames', {'Component', 'Closeness_Coefficient'});
T = sortrows(T, 'Closeness_Coefficient', 'descend');

disp('=== HASIL PERANGKINGAN FUZZY TOPSIS ===');
disp(T);
