#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main()
{
    int t = 0;
    cin>>t;
    vector<int> res(t);
    for(int i=0;i<t;++i)
    {
        int row,col=0;
        //获得行列数
        cin>>row>>col;
        char clab[row][col];
        //获得字符迷阵
        for(int m=0; m<row; ++m)
            for(int n=0; n<col; ++n)
            {
                cin>>clab[m][n];
            }
        string word("");
        //获得单词
        cin>>word;
        int word_len = word.length();

        int match_count = 0;
        /*******处理过程*******/
        for(int m=0; m<row; ++m)
        {
            for(int n=0; n<col; ++n)
            {
                if(clab[m][n] == word[0])
                {
                    //往右
                    if(n+word_len-1 < col)
                    {
                        bool match_flag = true;
                        for(int l = 1; l<word_len;)
                        {
                            if(clab[m][n+l] == word[l])
                                ++l;
                            else
                            {
                                match_flag = false;
                                break;
                            }
                        }
                        if(match_flag)
                            match_count++;
                    }
                    //往下
                    if(m+word_len-1 < row)
                    {
                        bool match_flag = true;
                        for(int l=1; l<word_len;)
                        {
                            if(clab[m+l][n] == word[l])
                                ++l;
                            else
                            {
                                match_flag = false;
                                break;
                            }
                        }
                        if(match_flag)
                            match_count++;
                    }
                    //45度
                    if(m+word_len-1<row && n+word_len-1<col)
                    {
                        bool match_flag = true;
                        for(int l = 1; l<word_len;)
                        {
                            if(clab[m+l][n+l] == word[l])
                                ++l;
                            else
                            {
                                match_flag = false;
                                break;
                            }
                        }
                        if(match_flag)
                            match_count++;
                    }
                }
            }
        }
        res[i] = match_count;
    }
    for(auto item:res)
        cout<<item<<endl;
    return 0;
}
