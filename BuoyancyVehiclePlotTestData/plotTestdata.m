fileID = fopen('testdata/050720/28.txt');
C = textscan(fileID,'%f32,%f32,%f32,%f32,%f32,%f32,%f32,%f32,%f32,%f32,%f32,%f32', 'HeaderLines', 1);
fileLength = length(C{1});
time            = C{1};
missionNr       = C{2};
targetDepth     = C{3};
pistonPosition  = C{4};
PIDoutput       = C{5};
pressureVoltage = C{6};
measuredDepth   = C{7};
psi             = C{8};
pascal          = C{9};
batteryVoltage  = C{10};
TEMP117temperature = C{11};

%%Moving-average filter
%    windowSize = 300;
%    b = (1/windowSize)*ones(1,windowSize);
%    a = 1;

%batt_filter = filter(b,a,batteryVoltage);


%%Plotting
close all;


%Vehicle measuredDepth + ref
    fig1 = figure(1);
    subplot(2,1,1);
    hold on;

    %SEGMENT 2
    hold on;
    plot((time(1:end)*0.001), measuredDepth(1:end));
    plot((time(1:end)*0.001),targetDepth(1:end),':');
    plot((time(1:end)*0.001),zeros(fileLength),'--');
    
    %plot(simDepth1.Depth.Time,simDepth1.Depth.Data,'-.k');
    %plot(simDepth2.Depth.Time+600,simDepth2.Depth.Data,'-.k');
    legend('Measured Depth','Target Depth');
    title('Measured Depth');
    xlabel('Time [s]');
    xlim([0 fileLength]);
    ylabel('Depth [m]');
    set(gca,'YDir','reverse');

    fig1.Position = [20 100 700 1000];
    hold off;

    subplot(2,1,2);
    plot((time(1:fileLength)*0.001),pistonPosition(1:fileLength));
    xlabel('Time [s]');
    xlim([0 fileLength]);
    ylabel('Position [mm]');
    title('Piston position');
    hold off;


%Pressure_Voltage, and measured depth
    fig2 = figure(2);
    subplot(3,1,1);
    hold on;
%Pressure Voltage
    yyaxis left
    plot((time(1:fileLength)*0.001), pressureVoltage(1:fileLength));
    ylabel('Voltage [V]');
    ylim([0.48, inf])
    
    yyaxis right
    plot((time(1:fileLength)*0.001), psi(1:fileLength),'--');
    ylabel('Pressure [psi]');
    
    legend('Pressure Input [V]','Pressure [psi]','Simulated','Location','southeast');
    title('Measured Pressure');
    xlabel('Time [s]');
    xlim([0 fileLength]);
    
    

% Measured Depth
    subplot(3,1,2);
    %yyaxis left
    hold on;
    plot((time(1:fileLength)*0.001), measuredDepth(1:fileLength));
    plot((time(1:end)*0.001),targetDepth(1:end),':');
    plot((time(1:end)*0.001),zeros(fileLength),'--');
    ylabel('Depth [m]');
    set(gca,'YDir','reverse');

    %yyaxis right
    %plot((time(1:fileLength)*0.001),pistonPosition(1:fileLength)*1000,'--');
    %ylabel('Piston Position [mm]');
    %set(gca,'YDir','reverse');

    legend('Measured Depth','Target Depth');
    xlabel('Time [s]');
    xlim([0 fileLength]);
    title('Measured Depth');


% Piston Position
    subplot(3,1,3);
    hold on;
    plot((time(1:fileLength)*0.001),pistonPosition(1:fileLength)*1000);
    plot((time(1:fileLength)*0.001),PIDoutput(1:fileLength)*1000,'--');
    legend('Piston Position','PID output');
    xlabel('Time [s]');
    xlim([0 fileLength]);
    ylabel('Position [mm]');
    title('Piston Position');

    fig2.Position = [20 100 700 1000];
    hold off;

%Battery Voltage
    fig3 = figure(3);
    hold on;
    plot((time(1:fileLength)*0.001),batteryVoltage(1:fileLength),'b');
    %plot((time(windowSize:fileLength)*0.001),batt_filter(windowSize:fileLength),'r');
    %legend('Batt raw','Batt Filter');
    title('Battery Voltage');
    xlabel('Time [s]');
    xlim([0 fileLength]);
    ylabel('Voltage [V]');
    ylim([11.0 24.0])
    fig3.Position = [800 620 700 500];
    hold off;

%Density
    sampleData = load('testdata/CC1437011_20200605_085748');
    densityInter = @(new_t) interp1(sampleData.Depth,sampleData.Density, new_t);

    fig8 = figure(8);
    plot(sampleData.Density,sampleData.Depth);
    title('Freshwater Tank Density');
    xlabel('Density [kg/m3]');
    ylabel('Depth [m]');
    set(gca,'YDir','Reverse')
    fig8.Position = [800 50 700 500];
    
    fig9 = figure(9);
    plot(sampleData.Temperature,sampleData.Depth);
    title('Freshwater Tank Temperature');
    xlabel(['Temperature [' char(176) 'C]']);
    ylabel('Depth [m]');
    set(gca,'YDir','Reverse')
    fig8.Position = [800 50 700 500];
