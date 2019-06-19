package pers.yu.practise.test;

import java.io.Console;
import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
        System.out.println("numbers need to build:");
        int numbersToBuild = in.nextInt();
        System.out.println("the highest number can be build:");
        int MAX_NUMBER = in.nextInt();

        int[] numbers = new int[MAX_NUMBER];
        for(int i=0;i<numbers.length;i++){
            numbers[i]=i+1;
        }

        int[] results = new int[numbersToBuild];
        for(int i=0;i<results.length;i++){
            int r = (int)(Math.random()*MAX_NUMBER);
            results[i]=numbers[r];
            numbers[r]=numbers[MAX_NUMBER-1];
        }

        Arrays.sort(results);
        System.out.println("result element:");
        for(int num : results)
            System.out.print(num+" ");
    }
}
