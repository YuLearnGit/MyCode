#include <iostream>
#include <vector>

using namespace std;

vector<int> printMatrix(vector<vector<int> >& matrix)
{
    vector<int> res;
    unsigned int rows = matrix.size();
    if(rows == 0)
        return res;
    unsigned int cols = matrix[0].size();
    int start = 0;
    while(rows>2*start && cols > 2*start)
    {
        int endx = cols-start-1;
        int endy = rows-start-1;
        //从左往右
        for(int i=start; i<=endx; ++i)
            res.push_back(matrix[start][i]);
        //从上往下
        if(start < endy)
        {
            for(int i=start+1; i<=endy; ++i)
                res.push_back(matrix[i][endx]);
        }
        //从右往左
        if(start<endx && start<endy)
        {
            for(int i=endx-1; i>=start; --i)
                res.push_back(matrix[endy][i]);
        }

        //从下往上
        if(start<endx && start<endy-1)
        {
            for(int i=endy-1; i>start; --i)
                res.push_back(matrix[i][start]);
        }

        ++start;
    }
    return res;
}
int main()
{
    vector<vector<int> > matrix = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
    vector<int> res = printMatrix(matrix);
    for(auto it:res)
        cout<<it<<" ";
    return 0;
}
